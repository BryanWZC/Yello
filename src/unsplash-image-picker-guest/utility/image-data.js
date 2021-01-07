// External modules
import axios from 'axios';

/**
 * Fetch page of images (default 10 according to api) in json format from unsplash API. Server acts as middleman to unsplash server.
 * @param {String} query - photo query
 * @param {String} page  - page of photos displayed
 */
export async function fetchJsonData(query, page = 1) {
    const jsonData = (await axios.get(`/board/get/unsplash-images?query=${query}&page=${page}`)).data;
    console.log(jsonData)
    return filterJsonData(jsonData);
};

/**
 * Filters raw json data from unsplash to display only necessary information
 * @param  {Object} jsonData - raw image json data obtained from Unsplash to be filtered
 * @return {Object}          - filtered json object
 */
export function filterJsonData(jsonData) {
    const filteredResults = jsonData.results.map(imageData => {
        const { id, blur_hash, color,  urls: { thumb = null, full = null}, user: { name = null, links: { html = null } }} = imageData;
        return { id, blur_hash, color, thumb, full, name, userSite: html };
    });
    return { ...jsonData, results: filteredResults };
}