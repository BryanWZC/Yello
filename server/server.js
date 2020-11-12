// External modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

// Internal modules - DB 
const { connect } = require('./db/connect');
const { User, Board, Card, List } = require('./db/model');
const PORT = process.env.PORT || 3000;

// Internal modules - utility 
const { base } = require('./utility/base-board');
const { unsplash } = require('./utility/unsplash-image');

// Middleware
app.use(express.static('assets'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')));
app.get('/dist/bundle-front.js', (req, res) => res.sendFile(path.join(__dirname, '../dist', 'bundle-front.js')));

/**************************************
 *       FOR BASE-BOARD FEATURE       *
 **************************************/ 

/**
 * Get board data from db given a boardId and returns it
 */
app.get('/get-board', async(req, res) => {
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
app.get('/get-item', async(req, res) => {
    const { listId } = req.query;
    const list = await List.findById(listId).lean().exec();
    res.json(list);
});

/**
 * Adds a card element to database when submitted.
 */
app.post('/post-card', async(req, res) => {
    const { boardId, cardTitle } = req.body;
    const newCard = await base.addNewCard({ boardId, cardTitle });
    res.json(newCard);
});

/**
 * Adds an item element to database when submitted.
 */
app.post('/post-list-item', async(req, res) => {
    const { cardId, listTitle } = req.body;
    const newListItem = await base.addNewListItem({ cardId, listTitle });
    res.json(newListItem);
});

/**
 * Updates card order within db after a drag occurs
 */
app.post('/update-card-order', async(req, res) => {
    const { boardId, newCardIds } = req.body;
    await base.updateCardOrder({ boardId, newCardIds });
    res.end();
});

/**
 * Updates list order from drag and drop
 */
app.post('/update-list-order', async(req, res) => {
    const { startCard, endCard } = req.body;
    await base.updateListOrder({ startCard, endCard });
    res.end();
});

/**
 * Updates list item content on db
 */
app.post('/update-item-content', async(req, res) => {
    const { _id, content } = req.body;
    await base.updateItemContent({ _id, content });
    res.end();
});

/**
 * Deletes an item from item doc and card itemIds list within its doc
 */
app.post('/delete-item', async(req, res) => {
    const { cardId, itemId } = req.body;
    await base.deleteItem({ cardId, itemId });
    res.end();
});

/**
 * Deletes a card from the card doc and board cardIds list within its doc
 */
app.post('/delete-card', async(req, res) => {
    const { boardId, cardId } = req.body;
    await base.deleteCard({ boardId, cardId });
    res.end();
});

/*************************************************
 *       FOR UNSPLASH IMAGE PICKER FEATURE       *
 *************************************************/ 

/**
 * Make a query to Unsplash API for images
 */
app.get('/get-unsplash-images', async(req, res) => {
    const { query, page } = req.query;
    const baseUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}`;
    const imageJson = await unsplash.fetchPhotosJson(baseUrl);
    res.json(imageJson);
});

/**
 * Updates 'background' from board doc in db
 */
app.post('/post-background', async(req, res) => {
    const { boardId, backgroundLink, blurHash } = req.body;
    await unsplash.updateBackground(boardId, backgroundLink, blurHash);
})

app.listen(PORT, async () => {
    await connect();
    console.log('Server is running. Listening on port 3000.')
});