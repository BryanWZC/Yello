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
        const boards = req.user ? req.user.boards : null;
        if(!boards) throw new Error('Missing boards');
        res.json(boards);
    });

router.route('/post/addBoard')
    .post(async(req, res) => {
        const { boardTitle } = req.body; 
        const { _id, boards } = req.user;
        
        const imageJson = await getRandomImageJson();

        const newBoard = await createNewBoard(boardTitle, imageJson);
        const newBoards = [ newBoard, ...boards ];

        req.session.passport.user.boards = newBoards;
        await updateUser(_id, newBoards);

        res.redirect('/board/' + _id);
    })

router.route('/dist/userPage.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'userPage.js')));


module.exports = router;

/**
 * TODO:
 * 5. Improve blurhash to work on start up.
 *     5.1 Allow main boards page to render the board images and titles correctly 
 *     5.2 Allow the board titles, card titles and list titles to be editable 
 * 6. Beautify the user page with animations for when there are no boards...look into designs for it.
 * 7. Enable email verification with the whoisxmlapi
 *     7.1 Send a verified email to users upon sign up (maybe)
 * 8. Include helmet.js for security purposes
 */