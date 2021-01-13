// External modules
const express = require('express');
const router = express.Router();

// Internal modules
const path = require('path');
const { getRandomImageJson, createNewBoard, updateUser } = require('../utility/user-page');

router.use(express.static('./assets'));
router.use((req, res, next) => {
    if(req.user) return next();
    res.redirect('/');
});

router.route('/:user')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'user-page.html'));
    })

router.route('/get/boardData')
    .get((req, res) => {
        const boards = req.session.passport.boards || req.user.boards;
        req.session.passport.boards = boards;
        if(!boards) throw new Error('Missing boards');
        res.json(boards);
    });

router.route('/post/addBoard')
    .post(async(req, res) => {
        const { boardTitle } = req.body; 
        const { _id } = req.user;
        const { boards } = req.session.passport;
        
        const imageJson = await getRandomImageJson();

        const newBoard = await createNewBoard(boardTitle, imageJson);
        const newBoards = [ newBoard, ...boards ];

        req.session.passport.boards = newBoards;
        await updateUser(_id, newBoards);
        res.redirect('/board/' + newBoard._id);
    });

router.route('/post/recentBoard')
    .post(async (req, res) => {
        const { boardId } = req.body;
        const { _id } = req.user;
        const { boards } = req.session.passport;
        const newBoards = [];

        const currentBoards = boards;
        currentBoards.map(board => board._id === boardId ? newBoards.unshift(board) : newBoards.push(board));
        req.session.passport.boards = newBoards;
        await updateUser(_id, newBoards);
        res.end();
    })

router.route('/dist/userPage.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'userPage.js')));


module.exports = router;

/**
 * TODO:
 *     5.2 Allow the board titles, card titles and list titles to be editable by adding a board actions, card actions and list actions to it.
 * 6. Beautify the user page with animations for when there are no boards...look into designs for it.
 * 7. Enable email verification with the whoisxmlapi
 *     7.1 Send a verified email to users upon sign up (maybe)
 * 8. Include helmet.js for security purposes
 */