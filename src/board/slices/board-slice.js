// External modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Internal modules - utility functions
import getAllBoardData from '../utility/get-state';
import addNewCard from '../utility/add-card';
import { addNewListItem, inputFieldReset } from '../utility/add-list';
import * as dragUtil from '../utility/drag-end';

// Internal modules - slices
import { cardMenuData, handleCardDelete } from './card-menu-slice';
import { handleItemDelete } from './item-menu-slice';

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
                return { boardId, newCardIds };
            }
            if(type === 'list'){
                const { newCardIds, startCard, endCard } = dragUtil.newCardIdsOnListDrag(cardIds, source, destination);
                dragUtil.updateDBListOrder(startCard, endCard);
                
                return { boardId, newCardIds };
        }
        } catch (err) {
            return err
        }
    }
);

// boardData slice
export const boardData = createSlice({
    name: 'board',
    initialState:{
        boardData: {},
        cardTitle: '',
        expandCardInput: '',
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
                const { cardId, value } = payload;
                state.listTitle = value; 
                state.expandCardInput = cardId;
            },
            prepare: (e) => { 
                e.persist();
                const cardId = e.target.getAttribute('data-cardid');
                return { payload: {
                    cardId,
                    value: e.target.value,
                    } 
                };
            }
        },
    },
    extraReducers: {
        [getBoardData.fulfilled]: (state, { payload }) => {
            state.boardData = payload;
            state.renderAddCard = true;
        },
        [handleAddCard.fulfilled]: (state, { payload }) => {
            state.boardData.cardIds.push(payload);
            state.cardTitle = '';
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
            const { newCardIds } = payload;
            state.boardData.cardIds = newCardIds;
        },
        [handleCardDelete.fulfilled]: (state, { payload }) => {
            state.boardData.cardIds = payload;
        },
        [handleItemDelete.fulfilled]: async(state, { payload }) => {
            const { cardId, listIds, itemId } = payload;
            state.boardData.cardIds[cardId].listIds = listIds;
            await updateDBItemDelete(cardId, itemId);
        }
    }
});

export const { setCardTitle, setListTitle } = boardData.actions;

export { getBoardData, handleAddCard, handleAddList, onDragEnd };