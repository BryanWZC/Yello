const express = require('express');
const { Model, Mongoose } = require('mongoose');
const app = express();
const morgan = require('morgan');
const path = require('path');

const { connect } = require('./db/connect');
const { User, Board, Card, List } = require('./db/model');
const port = process.env.PORT || 3000;

app.use(express.static('assets'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.get('/dist/bundle-front.js', (req, res) => res.sendFile(path.join(__dirname, '../dist', 'bundle-front.js')));

/**
 * Get board data from db given a boardId and returns it
 */
app.get('/get-board', async (req, res) => {
    const { boardId } = req.query;
    const boardDoc = await Board.findById(boardId).lean().exec();
    res.json(boardDoc);
});

/**
 * Adds a card element to database when submitted.
 */
app.post('/card-title', async (req, res) => {
    const { boardId, cardTitle } = req.body;
    await addNewCard({ boardId, cardTitle });
    res.end();
});

/**
 * Adds an item element to database when submitted.
 */
app.post('/card-list', async (req, res) => {
    const { boardId, listTitle } = req.body;
    await addNewItem({ boardId, listTitle });
    res.end();
});

app.listen(port, async () => {
    await connect();
    console.log('Server is running. Listening on port 3000.')
});

/**
 * Adds a new card object within the board object extracted from the database
 * @param  {Object} { boardId, cardTitle } - object containing board id and cardTitle
 * @return {Null}
 */
async function addNewCard({ boardId, cardTitle }) {
    const queryTitle = { title: cardTitle };
    const cardExists = await Card.findOne(queryTitle).lean().exec();
    
    if(!cardExists) return;
    
    const newCard = await Card.create(queryTitle);
    const cardId = newCard._id;

    await Board.findByIdAndUpdate(boardId, { $push: { cardOrder: cardId}}).exec();
}

// TODO finish function along with 2 new data collections in mongodb: Cards and list
async function addNewItem({ cardId, listTitle }) {
    const queryTitle = { title: listTitle };
    const listExists = await List.findOne(queryTitle).lean().exec();

    if(!listExists) return;

    const newList = await List.create(queryTitle);
    const listId = newList._id;

    await Card.findByIdAndUpdate
}