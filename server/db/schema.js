const mongoose = require('mongoose');

/**
 * Board schema containing the board id, board title and board object in JSON format.
 */
module.exports= {
    boardSchema: new mongoose.Schema({
        boardId: {
            type: String,
            required: true,
            unique: true,
        },
        boardTitle: {
            type: String,
            required: true,
            unique: true,
        },
        boardObj: {
            type: String,
            required: true,
            unique: true,
        },
    })
} ;