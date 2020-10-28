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
        boardTitle: {
            type: String,
            required: true,
            unique: true,
        },
        board: {
            type: String,
            required: true,
        },
    }, {timestamps: true})
};