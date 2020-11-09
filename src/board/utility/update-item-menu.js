import axios from 'axios';

/**
 * Checks if target element is a textarea or submit button
 * @param  {Object} e - event object
 * @return {Object}   - target element
 */
export function checkMenuElement(e) {
    if(e.target.getAttribute('role') === 'textarea') return e.target;
    else return document.querySelector('div#item-content-input');
}

/**
 * Makes a call to server to update item content in DB. 
 * @param {Object} itemData - current item data object
 * @param {String} content  - inputted string into textarea
 */
export async function updateDBItemContent(itemData, content) {
    await axios.post('/update-item-content', { ...itemData, content });
}

/**
 * Makes a call to server to delete item and update in DB.
 * @param {String} cardId - current card id
 * @param {String} itemId - current item id
 */
export async function updateDBItemDelete(cardId, itemId) {
    await axios.post('/delete-item', { cardId, itemId }); 
}