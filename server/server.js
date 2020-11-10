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
 * Get card data from db given cardId and returns it
 */
app.get('/get-card', async(req, res) => {
    const { cardId } = req.query;
    const card = await Card.findById(cardId).lean().exec();
    res.json(card);
});

/**
 * Get list id and title only from db given listId and return it
 */
app.get('/get-item-title-only', async(req, res) => {
    const { listId } = req.query;
    const list = await List.findById(listId).lean().exec();
    const { _id, title } = list;
    res.json({ _id, title });
});

/**
 * Get list data from db given listId and returns it
 */
app.get('/get-item', async (req, res) => {
    const { listId } = req.query;
    const list = await List.findById(listId).lean().exec();
    res.json(list);
})

/**
 * Get list data from db using given listId and return it
 */
app.get('/get-item', async (req, res) => {
    const { listId } = req.query;
    const list = await List.findById(listId).lean().exec();
    res.json(list);
})

/**
 * Adds a card element to database when submitted.
 */
app.post('/post-card', async (req, res) => {
    const { boardId, cardTitle } = req.body;
    const newCard = await addNewCard({ boardId, cardTitle });
    res.json(newCard);
});

/**
 * Adds an item element to database when submitted.
 */
app.post('/post-list-item', async (req, res) => {
    const { cardId, listTitle } = req.body;
    const newListItem = await addNewListItem({ cardId, listTitle });
    res.json(newListItem);
});

/**
 * Updates card order within db after a drag occurs
 */
app.post('/update-card-order', async (req, res) => {
    const { boardId, newCardIds } = req.body;
    await updateCardOrder({ boardId, newCardIds });
    res.end();
});

/**
 * Updates list order from drag and drop
 */
app.post('/update-list-order', async (req, res) => {
    const { startCard, endCard } = req.body;
    await updateListOrder({ startCard, endCard });
    res.end();
});

/**
 * Updates list item content on db
 */
app.post('/update-item-content', async (req, res) => {
    const { _id, content } = req.body;
    await updateItemContent({ _id, content });
    res.end();
});

/**
 * Deletes an item from item doc and card itemIds list within its doc
 */
app.post('/delete-item', async (req, res) => {
    const { cardId, itemId } = req.body;
    await deleteItem({ cardId, itemId });
    res.end();
});

/**
 * Deletes a card from the card doc and board cardIds list within its doc
 */
app.post('/delete-card', async (req, res) => {
    const { boardId, cardId } = req.body;
    await deleteCard({ boardId, cardId });
    res.end();
})

app.listen(port, async () => {
    await connect();
    console.log('Server is running. Listening on port 3000.')
});

/**
 * Adds a new card object within the board object extracted from the database
 * @param  {Object} { boardId, cardTitle } - object containing board id and cardTitle
 * @return {null}
 */
async function addNewCard({ boardId, cardTitle }) {
    const queryTitle = { title: cardTitle };
    
    const newCard = await Card.create(queryTitle);
    const { _id, title, listIds } = newCard;

    await Board.findByIdAndUpdate(boardId, { $push: { cardIds: _id}}, { useFindAndModify: false }).exec();
    return { _id, title, listIds };
}

/**
 * Add a new list item to a card. Updates listId array in card and adds new entry for list in db.
 * @param {Object} { cardId, listTitle } - Object that contains cardId and listTitle 
 * @return {null}
 */
async function addNewListItem({ cardId, listTitle }) {
    const newList = await List.create({ title: listTitle });
    const { _id, title, content } = newList;

    await Card.findByIdAndUpdate(cardId, { $push: { listIds: _id }}, { useFindAndModify: false }).exec();
    return { _id, title, content };
}

/**
 * Updates the card order within a Board document after a card has been dragged to displace another card's location
 * @param  {Object} { boardId, source, destination } - parameters for getting board and updating cardId order
 * @return {null} 
 */
async function updateCardOrder({ boardId, newCardIds }) {
    await Board.findByIdAndUpdate(boardId, { cardIds: newCardIds }, { new: true, useFindAndModify: false }).exec();
}   

/**
 * Update start and end card positions for dragging and dropping functionality
 * @param {Object} { startCard, endCard } - parameters for start and end cards with data within
 */
async function updateListOrder({ startCard, endCard }) {
    await Card.findByIdAndUpdate(startCard._id, { listIds: startCard.listIds }, { useFindAndModify: false }).exec();
    if(startCard._id === endCard._id) return;
    await Card.findByIdAndUpdate(endCard._id, { listIds: endCard.listIds }, { useFindAndModify: false }).exec();
}

/**
 * Updates list item in db given new content
 * @param {Object} { _id, content } - object containing list item parameters to update 
 */
async function updateItemContent({ _id, content }) {
    await List.findByIdAndUpdate(_id, { content }, { useFindAndModify: false });
}

/**
 * Delete an item from db and updates card listIds array
 * @param {Object} { cardId, itemId } - cardId with itemId of to be deleted item
 */
async function deleteItem({ cardId, itemId }){
    await List.findByIdAndDelete(itemId, { useFindAndModify: false });
    await Card.findByIdAndUpdate(cardId, { $pull: { listIds: itemId } }, { useFindAndModify: false });
}

/**
 * Deletes a card from db and updates board cardIds array
 * @param {Objetc} { boardId, cardId } - Object containing board and card id 
 */
async function deleteCard({ boardId, cardId }) {
    await Card.findByIdAndDelete(cardId, { useFindAndModify: false });
    await Board.findByIdAndUpdate(boardId, { $pull: { cardIds: cardId } },{ useFindAndModify: false });
}