// External modules
const axios = require('axios');
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

// Internal modules
const { User, Board } = require('../db/model');

/**
 * Returns a random unsplash image json
 */
async function getRandomImageJson() {
    const baseUrl = 'https://api.unsplash.com/photos/random?featured=true&content_filter=high&orientation=landscape';
    const url = `${baseUrl}&client_id=${process.env.UNSPLASH_CLIENT_ID}`;
    const imageJson = (await axios.get(url)).data;
    return imageJson;
}

/**
 * Creates a new board in db and returns a new board object.
 * @param {String} boardTitle - Title of created board
 * @param {Object} imageJson  - Object with image data from Unsplash
 */
async function createNewBoard(boardTitle, imageJson) {
        const { thumb, full } = imageJson.urls;
        const { blur_hash } = imageJson;

        const board = await Board.create({ 
            title: boardTitle, 
            background: full, 
            thumb: thumb, 
            blurHash: blur_hash 
        });

        return { 
            _id: board._id,
            title: board.title,
            thumb: board.thumb,
            blurHash: board.blurHash,
        };
}

/**
 * Update User doc with new Board object
 * @param {String} _id  - id of created board
 * @param {Object} newBoard  - new board object
 */
async function updateUser(_id, newBoards) {
    await User.findByIdAndUpdate(_id, { boards: newBoards }, { useFindAndModify: false });
}

module.exports = {
    getRandomImageJson,
    createNewBoard,
    updateUser,
}