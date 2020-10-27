const mongoose = require('mongoose');
const { boardSchema } = require('./schema');

/**
 * Model of board schema
 */
module.exports = {
    Board: mongoose.model('Board', boardSchema),
}