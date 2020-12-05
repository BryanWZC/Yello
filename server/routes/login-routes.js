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
    .post((req, res) => {
        passport.authenticate('local', { failureRedirect: '/' }),
        (req, res) => {
            res.redirect('/board');
        }
    });

module.exports = router;