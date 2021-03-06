// External modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Internal modules
import { checkMenuElement, updateDBItemContent, updateDBItemDelete, updateDBItemTitle } from '../utility/update-item-menu';
import { boardData } from './board-slice';

/**
 * Handles item content within textarea to update DB and state.
 */
const handleItemContent = createAsyncThunk(
    'itemMenu/handleItemContent',
    async({ content, title }, { getState }) => {
        const { mode, boardData } = getState().boardData;
        const { cardId, itemId } = getState().itemMenuData;
        const cardIndex = boardData.cardIds.map(card => card._id).indexOf(cardId);
        const card = boardData.cardIds[cardIndex];
        const itemIndex = card.listIds.map(item => item._id).indexOf(itemId);
        const item = card.listIds[itemIndex];

        if(content && item.content !== content) {
            await updateDBItemContent(item, content);
            return { cardIndex, itemIndex, content };
        }
        if(title && item.title !== title) {
            await updateDBItemTitle(item, title);
            return { cardIndex, itemIndex, title };
        }
        return;
});

/**
 * Handles item delete from state. Handled in board-slice.
 */
const handleItemDelete = createAsyncThunk(
    'itemMenu/handleItemDelete',
    async(_, { getState }) => {
        const { mode, boardData } = getState().boardData;
        const { cardId, itemId } = getState().itemMenuData;
        
        const card = boardData.cardIds.filter(card => card._id === cardId)[0];
        const listIds = card.listIds.filter(item => item._id !== itemId);
        if(mode === 'USER') await updateDBItemDelete(cardId, itemId);
        return { cardId, listIds };
    }
)

export const itemMenuData = createSlice({
    name: 'itemMenu',
    initialState: {
        displayItemMenu: false,
        expandInput: false,
        cardId: '',
        itemId: '',
    },
    reducers: { 
        handleTextareaExpand: (state) => {
            state.expandInput = true;
        },
        handleItemClick: {
            reducer: (state, { payload }) => {
                const { cardId, itemId } = payload;
                state.cardId = cardId;
                state.itemId = itemId;
                state.displayItemMenu = true;
            },
            /**
             * Displays a card with list item details and overlays the main page when clicked
             * @param {Object} e - event object
             */
            prepare: (e) => {
                e.persist();
                const cardId = e.target.getAttribute('data-cardid');
                const itemId = e.target.getAttribute('data-itemid');
                return {
                    payload: { cardId, itemId }
                };
            }
        },
        overlayOnClick: {
            reducer: (state, { payload }) => {
                if(payload === 'WRITING CONTENT') return;
                if(state.expandInput) {
                    state.expandInput = false;
                }
                else {
                    if(payload === 'NO ACTION') return;
                    state.displayItemMenu = false;
                    state.cardId = '';
                    state.itemId = '';
                }
            },
            /**
             * Resets state for item menu on overlay click 
             */
            prepare: (e) => {
                e.persist();
                if(e.target.getAttribute('id') === 'item-content-input' || 
                    e.target.parentNode.getAttribute('id') === 'item-content-input') return { payload: 'WRITING CONTENT' };
                if(e.target !== e.currentTarget) return { payload: 'NO ACTION' }
                return { payload: 'RESET VALUES' };
            }
        },
    },
    extraReducers: { 
        [handleItemContent.fulfilled]: (state, { payload }) => { },
        [handleItemDelete.fulfilled]: (state, { payload }) => {
            state.displayItemMenu = false;
            state.expandInput = false;
            state.cardId = '';
            state.itemId = '';
        },
    }
});

export const { handleTextareaExpand, handleItemClick, overlayOnClick, onBlurContent } = itemMenuData.actions;

export { handleItemContent, handleItemDelete };