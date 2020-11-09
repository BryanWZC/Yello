import axios from 'axios';

/**
 * Make a call and add a new list to db while updating card doc too. return list object.
 * @param  {String} cardId    - cardId
 * @param  {String} listTitle - title of list 
 * @return {Object}           - new list doc object  
 */
export async function addNewListItem(cardId, listTitle) {
    return (await axios.post('/post-list-item', { cardId, listTitle })).data;
}

/**
 * Resets all inputs fields when input is submitted
 */
export function inputFieldReset() {
    Array.from(document.querySelectorAll("input[type=text]"))
                .forEach( input => (input.value = ''));
}