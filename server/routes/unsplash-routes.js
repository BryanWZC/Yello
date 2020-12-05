// External modules
const express = require('express');
const router = express.Router();


// Internal modules - utility 
const { unsplash } = require('../utility/unsplash-image');

/**
 * Make a query to Unsplash API for images
 */
router.route('/get-unsplash-images')
    .get(async(req, res) => {
        const { query, page } = req.query;
        const baseUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}`;
        const imageJson = await unsplash.fetchPhotosJson(baseUrl);
        res.json(imageJson);
    });

/**
 * Updates 'background' from board doc in db
 */
router.route('/post-background')
    .post(async(req, res) => {
        const { boardId, backgroundLink, blurHash } = req.body;
        await unsplash.updateBackground(boardId, backgroundLink, blurHash);
    });

module.exports = router;