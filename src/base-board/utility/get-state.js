import axios from 'axios';

/**
 * Make a call to server to get board doc from db
 * @param  {String} boardId - board id 
 * @return {Object}         - board doc object
 */
async function getBoard() {
    const location = window.location.href;
    const boardId = location.match(/[\w\d]+$/)[0];
    if(boardId === 'guest') return;
    const { _id, cardIds, title, background, blurHash } = (await axios(`/board/get/board?boardId=${boardId}`)).data;
    return { _id, cardIds, title, background, blurHash };
};

/**
 * Make a call to server to get card doc from db
 * @param  {String} cardId - card id 
 * @return {Object}        - card doc object 
 */
async function getCard(cardId) {
    const { _id, listIds, title } = (await axios('/board/get/card?cardId=' + cardId)).data;
    return { _id, listIds, title };
}

/**
 * Make a call to server to get list doc from db
 * @param  {String} listId - list id 
 * @return {Object}        - list doc object
 */
async function getList(listId) {
    const { _id, content, title } = (await axios('/board/get/item?listId=' + listId)).data;
    return { _id, content, title };
}

/**
 * Make a call to server to get list data from each card obj listIds array
 * @param  {Object} cardObj - card data 
 * @return {Object}         - object with list data referenced by list ids
 */
async function getListData(cardObj) {
    return await Promise.all(cardObj.listIds.map(async (listId) => {
        return await getList(listId);
    }));
}

/**
 * Make a call to server to get board data nested with card and list data
 * @return {Object}         - nested board data object
 */
export default async function getAllBoardData() {
    const board = await getBoard();
    if(!board) return;
    const cardIds = await Promise.all(board.cardIds.map(async(cardId) => {
        const card = await getCard(cardId);
        const listIds = await getListData(card);
        return { ...card, listIds };
    }));
    return { ...board, cardIds };
}