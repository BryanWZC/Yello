const mongoose = require('mongoose');
const { boardSchema, userSchema } = require('./schema');

/**
 * Model of user and board schema
 */
module.exports = {
    User: mongoose.model('User', userSchema),
    Board: mongoose.model('Board', boardSchema),
}