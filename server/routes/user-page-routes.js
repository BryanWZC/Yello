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

        res.redirect('/board/board._id');
    })

router.route('/dist/userPage.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'userPage.js')));


module.exports = router;
/**
 * TODO:
 * 1. Ensure that req.user has the 'boards' property within it. [CHECKED]
 * 2. Ensure that whenever a new board can be added to the array for the user document it has the title, _id, unsplash mini icon and blurhash. [CHECKED]
 *  2.1. First, work on the visuals of the page. [CHECKED]
 *  2.2. Work on '/add-board' route from add-board-overlay to add a new board and redirect to new board page while updating db. [CHECKED]
 *  2.3 Debug errors on the user mode for the boards
 * 
 * 3. Ensure that whenever you first visit a page, the order of that board within the board property for the user document becomes first.
 * Look into adding it within the useEffect of board.js so that it only occurs once.
 * 4. Ensure that when you change the background image that you will update the user document with the boardid with the updated blurhash string 
 * so that it displays your current background image as a thumbmail 
 * 5. Beautify the user page with animations for when there are no boards...look into designs for it.
 * 6. Fix up blurhash for the board.
 * 7. Enable email verification with the whoisxmlapi
 * 8. Include helmet.js for security purposes
 */