import axios from 'axios';
import { filterJsonData } from '../image-data';

// Modified original function(s) such that axios will make calls to port 3000 instead of default 80
async function fetchJsonData(query, page = 1) {
    const jsonData = (await axios.get(`127.0.0.1:localhost:3000/get-unsplash-images?query=${query}&page=${page}`)).data;
    return filterJsonData(jsonData);
};

// NOTE: Ensure that the server is running
test('Evaluate unsplash filtered json data for length of 10, and existence of total and total_pages value', async () => {
    const jsonData = await fetchJsonData('cats');
    expect(jsonData.results.length).toBe(10);
    expect(jsonData.total).toBeTruthy();
    expect(jsonData.total_pages).toBeTruthy();
});

test('Evaluate each image data object from the json result to have only 5 entries: id, thumb, raw, name, userSite', async () => {
    const jsonData = await fetchJsonData('dogs');
    jsonData.results.forEach(imageData => {
        const { id, thumb, raw, name, userSite } = imageData;
        expect(Object.keys(imageData).length).toBe(5);
        expect(id).toBeTruthy;
        expect(thumb).toBeTruthy;
        expect(raw).toBeTruthy;
        expect(name).toBeTruthy;
        expect(userSite).toBeTruthy;
    })
});