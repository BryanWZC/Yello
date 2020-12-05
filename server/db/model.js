const mongoose = require('mongoose')
const { boardSchema, userSchema, cardSchema, listSchema } = require('./schema')

/**
 * Model of user and board schema
 */
module.exports = {
    User: mongoose.model('User', userSchema),
    Board: mongoose.model('Board', boardSchema),
    Card: mongoose.model('Card', cardSchema),
    List: mongoose.model('List', listSchema),
}
