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
 * Handles card deletes from menu. Action handled in board slice for boardData update.
 */
const handleCardDelete = createAsyncThunk(
    'cardMenu/handleCardDelete',
    async(_, { getState }) => {
        try {
            const { cardId } = getState().cardMenuData;
            const { mode, boardData } = getState().boardData;

            const newCardIds = newCardIdsOnCardDel(boardData, cardId);
            if(mode === 'USER') await updateDBDeleteCard(boardData._id, cardId);
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
                state.offsets = null;
                state.cardId = '';
                state.displayCardMenu = false;
            },
            /**
             * Resets states
             */
            prepare: () => { 
                return { 
                    payload: 'RESET' 
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
        [handleCardDelete.fulfilled]: (state, { payload }) => {
            state.displayCardMenu = false;
            state.offsets = null;
            state.cardId = '';
        }
    }
});

export const { cardMenuStateReset } = cardMenuData.actions;

export { setOffsetsCard, handleCardDelete };