// External modules
const express = require('express');
const router = express.Router();

// Internal modules
const path = require('path');
const { getRandomImageJson, createNewBoard, updateUser, deleteBoard, updateBoardTitle } = require('../utility/user-page');

router.use(express.static('./assets'));
router.use((req, res, next) => {
    if(req.user) return next();
    res.redirect('/');
});

router.route('/:user')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'user-page.html'));
    });

router.route('/return/home')
    .get((req, res) => {
        res.json({url: '/user/' + req.user.username.match(/^.+(?=\@)/)});
    });

router.route('/get/boardData')
    .get((req, res) => {
        try {
            const boards = req.session.passport.boards || req.user.boards;
            req.session.passport.boards = boards;
            if(!boards) throw new Error('Missing boards');
            res.json(boards);
        } catch (err) {
            console.log(err);
            res.end();
        }
    });

router.route('/post/addBoard')
    .post(async(req, res) => {
        try {
            const { boardTitle } = req.body; 
            const { _id } = req.user;
            const { boards } = req.session.passport;
            if(!boardTitle) throw new Error('No Board Title or Id provided');
            
            const imageJson = await getRandomImageJson();

            const newBoard = await createNewBoard(boardTitle, imageJson);
            const newBoards = [ newBoard, ...boards ];

            req.session.passport.boards = newBoards;
            await updateUser(_id, newBoards);
            res.redirect('/board/' + newBoard._id);
        } catch (err) {
            console.log(err);
            res.end();
        }
    });

router.route('/post/renameBoard')
    .post(async(req, res) => {
        try {
            const { boardTitle, boardId } = req.body;
            const { _id } = req.body;
            const { boards } = req.session.passport;
            if(!boardTitle || !boardId) throw new Error('No Board Title or Id provided');

            const newBoards = boards.map(board => {
                if(board._id === boardId) {
                    board.title = boardTitle;
                    updateBoardTitle(boardId, boardTitle); // Let this run async
                }
                return board;
            });

            req.session.passport.boards = newBoards;
            await updateUser(_id, newBoards);
            res.redirect('/user/' + req.user.username.match(/^.+(?=\@)/));
        } catch (err) {
            console.log(err);
            res.end();
        }
    });

router.route('/post/recentBoard')
    .post(async(req, res) => {
        const { boardId } = req.body;
        const { _id } = req.user;
        const { boards } = req.session.passport;
        const newBoards = [];

        const currentBoards = boards;
        currentBoards.map(board => board._id === boardId ? newBoards.unshift(board) : newBoards.push(board));
        req.session.passport.boards = newBoards;
        await updateUser(_id, newBoards);
        res.end();
    });

router.route('/post/deleteBoard')
    .post(async(req, res) => {
        try {
            const { boardId } = req.body;
            const { _id } = req.user;
            const { boards } = req.session.passport;
            const newBoards = [];
            if(!boardId) throw new Error('No BoardId to update db');

            boards.map(board => {
                if(board._id !== boardId) newBoards.push(board);
            });
            req.session.passport.boards = newBoards;

            await updateUser(_id, newBoards);
            deleteBoard(boardId);
            res.end();
        } catch (err) {
            console.log(err);
            res.end();
        }
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