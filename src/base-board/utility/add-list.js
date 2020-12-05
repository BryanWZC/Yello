import axios from 'axios';

/**
 * Make a call and add a new list to db while updating card doc too. return list object.
 * @param  {String} cardId    - cardId
 * @param  {String} listTitle - title of list 
 * @return {Object}           - new list doc object  
 */
export async function addNewListItem(cardId, listTitle) {
    return (await axios.post('/board/post-list-item', { cardId, listTitle })).data;
}