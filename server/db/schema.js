const mongoose = require('mongoose');

/**
 * User and Board schemas
 * User schema containing userId (username), password and boards map object.
 * Board schema containing the board id, board title and board map object.
 */
module.exports= {
    userSchema: new mongoose.Schema({
        userId: {
            type: String,
            required:true,
            unique: true,
        },
        userPassword: {
            type: String,
            required:true,
            unique: true,
        },
        userBoards: {
            type: String,
            required: true,
            default: '{}',
        }
    }),
    boardSchema: new mongoose.Schema({
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
        }
    }, {timestamps: true}),
    cardSchema: new mongoose.Schema({
        title: String,
        listIds: {
            type: [String],
            default: [],
        },
    }, {timestamps: true}),
    listSchema: new mongoose.Schema({
        title: String,
        content: {
            type: String,
            default: '',
        },
    }, {timestamps: true}),
};