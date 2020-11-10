import axios from 'axios';

/**
 * deletes card data from boardData copy and returns newCardIds object for boardData to update
 * @param  {Object} boardData - board data for state management
 * @param  {String} cardId    - current card id
 * @return {Object}           - filtered cardIds array
 */
export function newCardIdsOnCardDel(boardData, cardId) {
    return boardData.cardIds.filter(card => card._id !== cardId);
}

/**
 * Makes a call to server to delete card from Card collection and it's reference in cardIds in current board document
 * @param {String} boardId - current board id
 * @param {String} cardId  - current card id
 */
export async function updateDBDeleteCard(boardId, cardId) {
    await axios.post('delete-card', { boardId, cardId });
}