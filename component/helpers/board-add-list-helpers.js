import axios from 'axios';

/**
 * Make a call and add a new list to db while updating card doc too. return list object.
 * @param  {String} cardId    - cardId
 * @param  {String} listTitle - title of list 
 * @return {Object}           - new list doc object  
 */
async function addNewListItem({ cardId, listTitle }) {
    return (await axios.post('/post-list-item', { cardId, listTitle })).data;
}

/**
 * Creates new cardId array to update state for boardData
 * @param  {Object} boardData - boardData object for state management
 * @param  {Object} newList   - New list doc object to update boardData state  
 * @return {Array}            - New cardIds array to update boardData state with 
 */
function getNewCardIds(boardData, newList) {
    return boardData.cardIds.map(card => 
        card._id === cardId ?
            {...card, listIds: [...card.listIds, newList]} :
            card
    );
}

/**
 * Resets all inputs fields when input is submitted
 */
function inputFieldReset() {
    Array.from(document.querySelectorAll("input[type=text]"))
                .forEach( input => (input.value = ''));
}

export { addNewListItem, getNewCardIds, inputFieldReset }