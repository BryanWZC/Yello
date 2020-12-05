// External modules
const passport = require('passport');
const express = require('express');
const router = express.Router();

// Internal modules
const { User } = require('../db/model');

// Built-in modules
const path = require('path');

router.route('/sign-up')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../public', 'sign-up.html')))
    .post(
        (req, res) => {
            const { username, password } = req.body;
            User.register({ username: username }, password, (err, user) => {
                try {
                    if(err) throw new Error(err);
                    passport.authenticate('local');
                    res.redirect('/');
                } catch (error) {
                    res.redirect('/sign-up-error');
                }
            })
        }
    );

router.route('/sign-up-error')
        .get((req, res) => res.sendFile(path.join(__dirname, '../../public', 'sign-up-error.html')))

router.route('/dist/signUp.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'signUp.js')));

router.route('/dist/signUpError.js')
    .get((req, res) => res.sendFile(path.join(__dirname, '../../dist', 'signUpError.js')));

module.exports = router;