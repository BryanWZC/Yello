// Internal modules - utility 
const { unsplash } = require('./utility/unsplash-image');

module.exports = (app) => {
    /**
     * Make a query to Unsplash API for images
     */
    app.get('/get-unsplash-images', async(req, res) => {
        const { query, page } = req.query;
        const baseUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}`;
        const imageJson = await unsplash.fetchPhotosJson(baseUrl);
        res.json(imageJson);
    });

    /**
     * Updates 'background' from board doc in db
     */
    app.post('/post-background', async(req, res) => {
        const { boardId, backgroundLink, blurHash } = req.body;
        await unsplash.updateBackground(boardId, backgroundLink, blurHash);
    });
}