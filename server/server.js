const express = require('express');
const { Model, Mongoose } = require('mongoose');
const app = express();
const morgan = require('morgan');
const path = require('path');

const { connect } = require('./db/connect');
const { User, Board } = require('./db/model');
const port = process.env.PORT || 3000;

app.use(express.static('assets'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.get('/dist/bundle-front.js', (req, res) => res.sendFile(path.join(__dirname, '../dist', 'bundle-front.js')));

/**
 * Adds a card element to database when submitted.
 */
app.post('/card-title', async (req, res) => {
    const { cardTitle, boardId } = req.body;
    const boardDoc = await Board.findById(boardId).lean().exec();
    boardDoc.board = await addNewCard({boardDoc, cardTitle});
    await boardDoc.save();
    res.end();
});

app.listen(port, async () => {
    await connect();
    console.log('Server is running. Listening on port 3000.')
});

/**
 * Adds a new card object within the board object extracted from the database
 * @param  {Object} { boardDoc, cardTitle } - object containing board doc object and cardTitle
 * @return {Object}          - updated board object 
 */
async function addNewCard({ boardDoc, cardTitle }) {
    const board = JSON.parse(boardDoc.board);

    // Card validation
    if(board.cards[cardTitle]) return boardDoc.board;

    // Update cards
    const id = `card-${cardTitle.replace(/ /g,'-')}`;
    board.cards[cardTitle] = {
        id: id,
        title: cardTitle,
        itemIds: [],
    };

    // Update card order
    board.cardOrder.push(id);

    return JSON.stringify(board);
}