// Connect to env
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../../.env')});

// External modules
const axios = require('axios');

// Internal modules
const { Board } = require('../db/model');

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
 * Updates board doc with new background image url 
 * @param {String} boardId        - current board id
 * @param {String} backgroundLink - Link for background image from Unsplash
 * @param {String} blurHash       - blurhash for background image from unsplash
 */
async function updateBackground(boardId, backgroundLink, blurHash) {
    await Board.findByIdAndUpdate(boardId, { background: backgroundLink, blurHash: blurHash }, { useFindAndModify: false }).exec();
}

module.exports = {
    unsplash : {
        fetchPhotosJson,
        updateBackground,
    }
}