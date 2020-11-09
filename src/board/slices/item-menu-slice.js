// External modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Internal modules
import { checkMenuElement, updateDBItemContent } from '../utility/update-item-menu';
import { boardData } from './board-slice';

/**
 * Handles item content within textarea to update DB and state.
 */
const handleItemContent = createAsyncThunk(
    'itemMenu/handleItemData',
    async(e, { getState }) => {
        e.persist();
        const { boardData } = getState().boardData;
        const { cardId, itemId } = getState().itemMenuData;
        const itemData = { ...boardData[cardId].listIds[itemId] };

        if(!e.target.getAttribute('id')) return { displayItemMenu: false };

        const target = checkMenuElement(e);
        const content = target.innerText.trim();
        
        if(content === '') target.innerHTML = "<pre id='item-content-input'></pre>";
        if(temp !== content) await updateDBItemContent(itemData, content);
});

/**
 * Handles item delete from state. Handled in board-slice.
 */
const handleItemDelete = createAsyncThunk(
    'itemMenu/handleItemDelete',
    async(_, { getState }) => {
        const { boardData } = getState().boardData;
        const { cardId, itemId } = getState().itemMenuData;
        
        const listIds = boardData.cardIds[cardId].listIds
            .filter(item => item._id !== itemId);

        return { cardId, listIds, itemId };
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
                const { expandInput, displayItemMenu, cardId, itemId } = payload;
                if(expandInput) state.expandInput = expandInput;
                if(displayItemMenu && cardId && itemId) {
                    state.displayItemMenu = displayItemMenu;
                    state.cardId = cardId;
                    state.itemId = itemId;
                }
            },
            /**
             * Handles overlay on click to clear out and reveal Board component
             * @param {Object} e - event object 
             */
            prepare: (e) => {
                e.persist();
                if(!e.target.getAttribute('id')) return{ 
                    payload:{ expandInput: false }
                };
                if(e.target.getAttribute('data-return')) return {
                    payload: { displayItemMenu: false, cardId: '', itemId: '' }
                };
            }
        },
    },
    extraReducers: { 
        [handleItemContent.fulfilled]: (state, { payload }) => { },
    }
});

export  const { handleTextareaExpand, handleItemClick, overlayOnClick } = itemMenuData.actions;

export { handleItemContent, handleItemDelete };