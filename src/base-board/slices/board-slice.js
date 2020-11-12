// External modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Internal modules - utility functions
import getAllBoardData from '../utility/get-state';
import addNewCard from '../utility/add-card';
import { addNewListItem, inputFieldReset } from '../utility/add-list';
import * as dragUtil from '../utility/drag-end';

// Internal modules - slices
import { handleCardDelete } from './card-menu-slice';
import { handleItemContent, handleItemDelete } from './item-menu-slice';
import { changeBackground } from '../../unsplash-image-picker/slices/background-slice';

// Async state functions 
const getBoardData = createAsyncThunk(
    'board/getData',
    async(boardId) => {
        try {
            return await getAllBoardData(boardId);
        } catch (err) {
            return err;
        }
});

/**
 * Adds a new card
 */
const handleAddCard = createAsyncThunk(
    'board/handleAddCard',
    async(e, { getState }) => {
        try {
            const { boardData, cardTitle } = getState().boardData;
            if(cardTitle && boardData) {
                const title = cardTitle.trim();
                return await addNewCard(boardData._id, title);
            }
        } catch (err) {
            return err;
        }
    }
);

/**
 * Adds a new list item
 */
const handleAddList = createAsyncThunk(
    'board/handleAddList',
    async({ e, cardId }, { getState }) => {
        try {
            const { boardData, listTitle } = getState().boardData;
            if(listTitle && boardData) {
                const newItem = await addNewListItem(cardId, listTitle);
                inputFieldReset();
                return { cardId, newItem };
            }
        } catch (err) {
            return err;
        }
    }
);

/**
 * Handles after on drag interactions
 */
const onDragEnd = createAsyncThunk(
    'board/onDragEnd',
    async(res, { getState }) => {
        try {
            const { type, source, destination } = res;
            if(!destination) return false;
            const { cardIds, _id: boardId } = getState().boardData.boardData;
            if(dragUtil.checkIdIndexSame(source, destination)) return false;
            if(type === 'card'){
                const newCardIds = dragUtil.getUpdatedCardIds(cardIds, source, destination);
                dragUtil.updateDBCardOrder(boardId, newCardIds)
                return { type, newCardIds };
            }
            if(type === 'list'){
                const { startCard, endCard, startIndex, endIndex } = dragUtil.newCardIdsOnListDrag(cardIds, source, destination);
                dragUtil.updateDBListOrder(startCard, endCard);
                
                return { type, startCard, endCard, startIndex, endIndex };
        }
        } catch (err) {
            return err;
        }
    }
);

// boardData slice
export const boardData = createSlice({
    name: 'board',
    initialState:{
        boardData: {},
        background: '',
        loadedBackground: '',
        blurHash: '',
        cardTitle: '',
        expandCardInput: false,
        expandListInput: '',
        listTitle: '',
        renderAddCard: false,
    },
    reducers: { 
        setCardTitle: {
            reducer: (state, { payload }) => { 
                state.cardTitle = payload; 
            },
            prepare: (e) => { 
                e.persist(); 
                return { payload: e.target.value };
            }
        },
        setListTitle: {
            reducer: (state, { payload }) => { 
                const { value } = payload;
                state.listTitle = value; 
            },
            prepare: (e) => { 
                e.persist();
                return { payload: {
                    value: e.target.value,
                    }
                };
            }
        },
        setLoadedBackground: {
            reducer: (state, { payload }) => {
                state.loadedBackground = payload;
            },
            prepare: (url) => {
                return {
                    payload: url
                }
            }
        },
        setExpandCardInput: (state) => { state.expandCardInput = true; },
        closeCardInput: (state) => { state.expandCardInput = false; },
        setExpandListInput: {
            reducer: (state, { payload }) => {
                state.expandListInput = payload;
            },
            prepare: (e) => {
                const cardId = e.target.getAttribute('data-cardid');
                return {
                    payload: cardId,
                }
            }
        },
        closeListInput: (state) => { state.expandListInput = ''; }
    },
    extraReducers: {
        [getBoardData.fulfilled]: (state, { payload }) => {
            state.boardData = payload;
            state.renderAddCard = true;
        },
        [handleAddCard.fulfilled]: (state, { payload }) => {
            if(payload) {
                state.boardData.cardIds.push(payload);
                state.cardTitle = '';
            }
        },
        [handleAddList.fulfilled]: (state, { payload }) => {
            const { cardId, newItem } = payload;
            const index = state.boardData.cardIds.map(card => card._id).indexOf(cardId);
            const card = state.boardData.cardIds[index];
            card.listIds.push(newItem);
            state.listTitle = '';
        },
        [onDragEnd.fulfilled]: (state, { payload }) => {
            if(!payload) return;
            const { type, startCard, endCard, startIndex, endIndex, newCardIds } = payload;
            if(type === 'list') {
                state.boardData.cardIds[startIndex].listIds = startCard.listIds;
                if(startIndex === endIndex) return;
                state.boardData.cardIds[endIndex].listIds = endCard.listIds;
            }
            if(type === 'card') {
                state.boardData.cardIds = newCardIds;
            }
        },
        [handleCardDelete.fulfilled]: (state, { payload }) => {
            state.boardData.cardIds = payload;
        },
        [handleItemContent.fulfilled]: (state, { payload }) => {
            if(!payload) return;
            const { cardIndex, itemIndex, content } = payload;
            state.boardData.cardIds[cardIndex].listIds[itemIndex].content = content;
        },
        [handleItemDelete.fulfilled]: (state, { payload }) => {
            const { cardId, listIds } = payload;
            const index = state.boardData.cardIds.map(card => card._id).indexOf(cardId);
            state.boardData.cardIds[index].listIds = listIds;
        },
        [changeBackground.fulfilled]: (state, { payload }) => {
            const { background, blurHash } = payload;
            state.boardData.background = background;
            state.loadedBackground = '';
            state.blurHash = blurHash;
        },
    }
});

export const { setCardTitle, setListTitle, setLoadedBackground, setExpandCardInput, closeCardInput, setExpandListInput, closeListInput } = boardData.actions;

export { getBoardData, handleAddCard, handleAddList, onDragEnd };