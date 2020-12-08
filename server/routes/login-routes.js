// External modules
const passport = require('passport');
const express = require('express');
const router = express.Router();

// Internal modules
const { User } = require('../db/model');

// Built-in modules
const path = require('path');

router.route('/')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../public', 'login.html')));

router.route('/dist/login.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'login.js')));

router.route('/login')
    .post(
        passport.authenticate('local', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/user/' + req.user.username.match(/^.+(?=\@)/));
        }
    ); // TODO: figure out why the authentication does not work by going into repl

module.exports = router;