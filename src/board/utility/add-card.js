import axios from 'axios';

/**
 * Make a call to server and add a new card to db while updating board doc too. return card object.
 * @param  {String} boardId   - boardId
 * @param  {String} cardTitle - title of card
 * @return {Object}           - New card doc Object 
 */
export default async function addNewCard(boardId, cardTitle) {
    return (await axios.post('/post-card', { boardId, cardTitle })).data;
}