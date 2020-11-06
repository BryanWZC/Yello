const { combineReducers, unwrapResult, configureStore, createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
const { useDispatch } = require('react-redux');
const axios = require('axios');

const getBoardData = createAsyncThunk(
    'board/getData',
    async(boardId) =>{
        try {
            return await getBoardDataz(boardId);
        } catch (err) {
            return err;
        }
    });

const boardData = createSlice({
    name: 'boardData',
    initialState:{
        _id:'',
        title: '',
        cardIds: [],
    },
    reducers: {

    },
    extraReducers: {
        [getBoardData.fulfilled]: (state, action) => {
            state = action.payload;
        }
    }
});

const reducer = combineReducers({
    boardData: boardData.reducer
});

const store = configureStore({ reducer });

store.dispatch(getBoardData('5f9fc3462df3c70d34dc28ca'))

console.log(store.getState())

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
async function getBoardDataz(boardId) {
    const board = await getBoard(boardId);
    const cardIds = { };
    await Promise.all(board.cardIds.map(async (cardId) => {
        const card = await getCard(cardId);
        const listIds = await getListData(card);
        cardIds[card._id] = {...card, listIds};
    }));
    return { ...board, cardIds };
}

/**
 * Make a call to server to get list doc from db
 * @param  {String} listId - list id 
 * @return {Object}        - list doc object
 */
async function getList(listId) {
    return (await axios('127.0.1:localhost:3000/get-item?listId=' + listId)).data;
}

/**
 * Make a call to server to get board doc from db
 * @param  {String} boardId - board id 
 * @return {Object}         - board doc object
 */
async function getBoard(boardId) {
    return (await axios('127.0.1:localhost:3000/get-board?boardId=' + boardId)).data
};

/**
 * Make a call to server to get card doc from db
 * @param  {String} cardId - card id 
 * @return {Object}        - card doc object 
 */
async function getCard(cardId) {
    return (await axios('127.0.1:localhost:3000/get-card?cardId=' + cardId)).data;
}