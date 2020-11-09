// External modules
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Internal modules - slices
import { newCardIdsOnCardDel, updateDBDeleteCard } from '../utility/update-card-menu';

/**
 * On card ellipsis click, make the card action menu visible 
 * @param {Object} e - event object
 */
const setOffsetsCard = createAsyncThunk(
    'cardMenu/setOffsetsCard', 
    (e, { getState }) => {
        e.persist();
        const { displayCardMenu } = getState().cardMenuData;
        if(displayCardMenu) return { offsets: null, cardId: '' };
        if(e.target === e.currentTarget) {
            return {
                    offsets: { left: e.target.offsetLeft, top: e.target.offsetTop + 40 },
                    cardId: e.target.getAttribute('data-cardid'),
            }
        }
});

/**
 * Reset offset state and hide the card action menu when click everywhere except the card action menu. PLaced globally on the global container.
 */
const resetCardMenuState = createAsyncThunk(
    'cardMenu/resetCardMenuState', 
    (e, { getState }) =>  {
        e.persist();
        const { offsets } = getState().cardMenuData; 
        if(offsets && e.target.getAttribute('id') !== 'card-action-menu') return { offsets: null, cardId: '' };
        return false;
});

/**
 * Handles card deletes from menu. Action handled in board slice for boardData update.
 */
const handleCardDelete = createAsyncThunk(
    'cardMenu/handleCardDelete',
    async(_, { getState }) => {
        try {
            const { cardId } = getState().cardMenuData;
            const { boardData } = getState().boardData;

            const newCardIds = newCardIdsOnCardDel(boardData, cardId);
            await updateDBDeleteCard(boardData._id, cardId);
            return newCardIds;
        } catch (err) {
            return err
        }
    }
)

export const cardMenuData = createSlice({
    name: 'cardMenu',
    initialState: {
        displayCardMenu: false,
        offsets: null,
        cardId: '',
    },
    reducers: { 
        cardMenuStateReset: {
            reducer: (state, { payload }) => {
                const { offsets, cardId } = payload;
                state.offsets = offsets;
                state.cardId = cardId;
                state.displayCardMenu = false;
            },
            /**
             * Resets states after deletion of card
             */
            prepare: () => { 
                return { 
                    payload: { offsets: null, cardId: '' } 
                }
            } 
        },
    },
    extraReducers: { 
        [setOffsetsCard.fulfilled]: (state, { payload }) => {
            const { offsets, cardId } = payload;
            state.offsets = offsets;
            state.cardId = cardId;
            
            if(offsets) state.displayCardMenu = true;
            else state.displayCardMenu = false;
        },
        [resetCardMenuState.fulfilled]: (state, { payload }) => {
            if(!payload) return;

            const { offsets, cardId } = payload;
            state.offsets = offsets;
            state.cardId = cardId;
            state.displayCardMenu = false;
        }
    }
});

export const { cardMenuStateReset } = cardMenuData.actions;

export { setOffsetsCard, resetCardMenuState, handleCardDelete };