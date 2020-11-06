import axios from 'axios';

/**
 * Make a call to server to get board doc from db
 * @param  {String} boardId - board id 
 * @return {Object}         - board doc object
 */
async function getBoard(boardId) {
    return (await axios('/get-board?boardId=' + boardId)).data
};

/**
 * Make a call to server to get card doc from db
 * @param  {String} cardId - card id 
 * @return {Object}        - card doc object 
 */
async function getCard(cardId) {
    return (await axios('/get-card?cardId=' + cardId)).data;
}

/**
 * Make a call to server to get list doc from db
 * @param  {String} listId - list id 
 * @return {Object}        - list doc object
 */
async function getListTitle(listId) {
    return (await axios('/get-item-title-only?listId=' + listId)).data;
}

/**
 * Make a call to server to get list doc from db
 * @param  {String} listId - list id 
 * @return {Object}        - list doc object
 */
async function getList(listId) {
    return (await axios('/get-item?listId=' + listId)).data;
}

/**
 * Make calls to server to get all list docs from the listIds array in card
 * @param  {Object} cardObj - card object with listIds array
 * @return {Array}          - array of list doc objects
 */
async function getCardAllList(cardObj) {
    return Promise.all(cardObj.listIds.map(async (listId) => getListTitle(listId)));
}

/**
 * Make calls to server to get all card docs from cardIds array in board
 * @param  {Object} boardObj - board object with cardIds arrays 
 * @return {Array}           - array of cards data with array of lists data within
 */
async function getBoardAllCards(boardObj) {
    return Promise.all(boardObj.cardIds.map(async (cardId) => {
        const card = await getCard(cardId);
        const listIds = await getCardAllList(card);
        return { ...card, listIds };
    }));
}

/**
 * Make a call to server to get list data from each card obj listIds array
 * @param  {Object} cardObj - card data 
 * @return {Object}         - object with list data referenced by list ids
 */
async function getListData(cardObj) {
    const listIds = { };
    await Promise.all(cardObj.listIds.map(async (listId) => {
        const list = await getList(listId);
        listIds[list._id] = list;
    }));
    return listIds;
}

/**
 * Make a call to server to get board data nested with card and list data
 * @param  {String} boardId - board id 
 * @return {Object}         - nested board data object
 */
async function getAllBoardData(boardId) {
    const board = await getBoard(boardId);
    const cardIds = { };
    await Promise.all(board.cardIds.map(async (cardId) => {
        const card = await getCard(cardId);
        const listIds = await getListData(card);
        cardIds[card._id] = {...card, listIds};
    }));
    return { ...board, cardIds };
}

export {
    getBoard, getCard, 
    getListTitle, getCardAllList,
    getBoardAllCards, getAllBoardData
}