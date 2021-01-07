// Connect to env
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});

// External modules
const axios = require('axios');

// Internal modules
const { User, Board } = require('../db/model');

/**
 * Fetch json data from unsplash server based on page and query
 * @param  {String} baseUrl - current baseUrl string with page and query details
 * @return {Object}         - JSON result object of images
 */
async function fetchPhotosJson(baseUrl) {
    const orientation = 'landscape';
    const url = `${baseUrl}&client_id=${process.env.UNSPLASH_CLIENT_ID}&orientation=${orientation}`;
    return (await axios.get(url)).data
}

/**
 * Updates board and user doc with new background image url 
 * @param {Object} props - object containing data to update background image
 */
async function updateBackground({ title, user, boardId, backgroundLink, thumb, blurHash }) {
    const props = { title, user, boardId, backgroundLink, thumb, blurHash };
    await updateBoardDoc(props);
    return (await updateUserDocBoard(props)).boards;
}

/**
 * Updates current board within boards within User doc to reflect background image change
 * @param {Object} props - object containing data to update background image
 */
async function updateUserDocBoard(props) {
    const { title, user, backgroundLink, thumb, blurHash } = props;
    const { _id: userId, boards } = user;
    const currentBoard = { ...boards[0], background: backgroundLink, thumb: thumb,  blurHash: blurHash, title: title };
    const currentBoards = [ currentBoard, ...boards.slice(1) ];

    return await User.findByIdAndUpdate(userId, { boards: currentBoards }, { useFindAndModify: false, new: true });
}

/**
 * Updates current board doc to reflect background image change
 * @param {Object} props - object containing data to update background image
 */
async function updateBoardDoc(props) {
    const { title, boardId, backgroundLink, thumb, blurHash } = props;
    await Board.findByIdAndUpdate(boardId, { background: backgroundLink, blurHash: blurHash, thumb: thumb, title: title }, { useFindAndModify: false });
}

module.exports = {
    unsplash : {
        fetchPhotosJson,
        updateBackground,
    }
}