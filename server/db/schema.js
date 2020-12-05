const mongoose = require('mongoose')
const { Schema } = mongoose
const passportLocalMongoose = require('passport-local-mongoose')

/**
 * User and Board schemas
 * User schema containing userId (username), password and boards map object.
 * Board schema containing the board id, board title and board map object.
 */

module.exports = {
    userSchema: new Schema(
        {
            username: String,
            password: String,
            boards: {
                type: [String],
                default: [],
            },
        },
        { timestamps: true }
    ).plugin(passportLocalMongoose),
    boardSchema: new Schema(
        {
            title: {
                type: String,
                required: true,
                unique: true,
            },
            cardIds: {
                type: [String],
                default: [],
            },
            background: {
                type: String,
                default: '',
            },
            blurHash: {
                type: String,
                default: '',
            },
        },
        { timestamps: true }
    ),
    cardSchema: new Schema(
        {
            title: String,
            listIds: {
                type: [String],
                default: [],
            },
        },
        { timestamps: true }
    ),
    listSchema: new Schema(
        {
            title: String,
            content: {
                type: String,
                default: '',
            },
        },
        { timestamps: true }
    ),
}
