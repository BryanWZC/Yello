import axios from 'axios';
/**
 * Find if title exists from cards within cardIds array in boardData
 * @param  {Object} boardData - board object
 * @param  {String} title     - title 
 * @return {Boolean}          - returns true if title exists 
 */
function findIfTitleExists(boardData, title) {
    return boardData.cardIds.filter(card => card.title === title).length > 0;
}

/**
 * Make a call to server and add a new card to db while updating board doc too. return card object.
 * @param  {String} boardId   - boardId
 * @param  {String} cardTitle - title of card
 * @return {Object}           - New card doc Object 
 */
async function addNewCard(boardId, cardTitle) {
    return (await axios.post('/post-card', { boardId, cardTitle })).data;
}

export { findIfTitleExists, addNewCard }