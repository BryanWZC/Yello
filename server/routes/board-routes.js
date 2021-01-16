// External modules
const passport = require('passport');
const express = require('express');
const router = express.Router();

// Built-in modules
const path = require('path');

// Internal modules - DB 
const { User, Board, Card, List } = require('../db/model');

// Internal modules - utility 
const { base } = require('../utility/base-board');

router.use((req, res, next) => {
    if(req.user) return next();
    res.redirect('/');
});

router.route('/:boardId')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../public', 'board.html')));

router.route('/dist/board.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'board.js')));

router.route('/return/home')
    .get((req, res) => {
        res.json({url: '/user/' + req.user.username.match(/^.+(?=\@)/)});
    });

/**
 * Get board data from db given a boardId and returns it
 */
router.route('/get/board')
.get(async(req, res) => {
    try {
        const boards = req.user.boards.map(obj => obj._id);
        const { boardId } = req.query;
        console.log(boards, boardId)
        if(!boards.includes(boardId)) throw new Error('No Board for user found!');
        const boardDoc = await Board.findById(boardId).lean().exec();
        res.json(boardDoc);
    } catch (error) {
        res.redirect('/user/' + req.user.username.match(/^.+(?=\@)/));
    }
});

/**
 * Get card data from db given cardId and returns it
 */
router.route('/get/card')
    .get(async(req, res) => {
        const { cardId } = req.query;
        const card = await Card.findById(cardId).lean().exec();
        res.json(card);
    });

/**
 * Get list id and title only from db given listId and return it
 */
router.route('/get/item-title-only')
    .get(async(req, res) => {
        const { listId } = req.query;
        const list = await List.findById(listId).lean().exec();
        const { _id, title } = list;
        res.json({ _id, title });
    });

/**
 * Get list data from db given listId and returns it
 */
router.route('/get/item')
    .get(async(req, res) => {
        const { listId } = req.query;
        const list = await List.findById(listId).lean().exec();
        res.json(list);
    });

/**
 * Adds a card element to database when submitted.
 */
router.route('/post/card')
    .post(async(req, res) => {
        const { boardId, cardTitle } = req.body;
        const newCard = await base.addNewCard({ boardId, cardTitle });
        res.json(newCard);
    });

/**
 * Adds an item element to database when submitted.
 */
router.route('/post/list-item')
    .post(async(req, res) => {
        const { cardId, listTitle } = req.body;
        const newListItem = await base.addNewListItem({ cardId, listTitle });
        res.json(newListItem);
    });

/**
 * Renames the card in the db
 */
router.route('/post/renameCard')
    .post(async(req, res) => {
        const { cardId, cardTitle } = req.body;
        const newCard = await base.updateCardTitle({ cardId, cardTitle });
        res.json(newCard);
    });

/**
 * Updates card order within db after a drag occurs
 */
router.route('/update/card-order')
    .post(async(req, res) => {
        const { boardId, newCardIds } = req.body;
        await base.updateCardOrder({ boardId, newCardIds });
        res.end();
    });

/**
 * Updates list order from drag and drop
 */
router.route('/update/list-order')
    .post(async(req, res) => {
        const { startCard, endCard } = req.body;
        await base.updateListOrder({ startCard, endCard });
        res.end();
    });

/**
 * Updates list item content in db
 */
router.route('/update/item-content')
    .post(async(req, res) => {
        const { _id, content } = req.body;
        await base.updateItemContent({ _id, content });
        res.end();
    });

/**
 * Updates list title in db
 */
router.route('/update/item-title')
    .post(async(req, res) => {
        const { _id, title } = req.body;
        console.log(title)
        await base.updateItemTitle({ _id, title });
        res.end();
    })

/**
 * Deletes an item from item doc and card itemIds list within its doc
 */
router.route('/delete/item')
    .post(async(req, res) => {
        const { cardId, itemId } = req.body;
        await base.deleteItem({ cardId, itemId });
        res.end();
    });

/**
 * Deletes a card from the card doc and board cardIds list within its doc
 */
router.route('/delete/card')
    .post(async(req, res) => {
        const { boardId, cardId } = req.body;
        console.log(boardId, cardId)
        await base.deleteCard({ boardId, cardId });
        res.end();
    });


module.exports = router;