// External modules
const passport = require('passport');
const express = require('express');
const router = express.Router();

// Built-in modules
const path = require('path');

router.use(express.static('./assets'));

router.route('/guest')
    .get(
        (req, res) => res.sendFile(path.join(__dirname, '../../public', 'guest-board.html'))
    );

router.route('/dist/guestBoard.js')
        .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'guestBoard.js')));


module.exports = router;