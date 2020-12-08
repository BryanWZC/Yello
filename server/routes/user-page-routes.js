// External modules
const passport = require('passport');
const express = require('express');
const router = express.Router();

// Internal modules
const path = require('path');
const { route } = require('./login-routes');

router.use(express.static('./assets'));
router.use((req, res, next) => {
    if(req.user) return next();
    res.redirect('/');
});

router.route('/:user')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../public', 'user-page.html')))

router.route('/dist/userPage.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'userPage.js')));

module.exports = router;
/**
 * TODO:
 * 1. Ensure that req.user has the 'boards' property within it.
 * 2. Ensure that whenever a new board can be added to the array for the user document it has the title, _id, unsplash mini icon and blurhash.
 * 3. Ensure that whenever you first visit a page, the order of that board within the board property for the user document becomes first.
 * Look into adding it within the useEffect of board.js so that it only occurs once.
 * 4. Ensure that when you change the background image that you will update the user document with the boardid with the updated blurhash string 
 * so that it displays your current background image as a thumbmail 
 * 5. Beautify the user page with animations for when there are no boards...look into designs for it.
 * 6. Fix up blurhash for the board.
 * 7. Enable email verification with the whoisxmlapi
 * 8. Include helmet.js for security purposes
 */