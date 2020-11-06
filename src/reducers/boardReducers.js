import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllBoardData } from '../helpers/board-state-helpers';
import { addNewCard } from '../helpers/board-add-card-helpers';
// TODO CHANGE REDUCER FILE NAME TO SLICES AND 
const getBoardData = createAsyncThunk(
    'board/getData',
    async(boardId) => {
        try {
            return await getAllBoardData(boardId);
        } catch (err) {
            return err;
        }
    });

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
)

const boardData = createSlice({
    name: 'board',
    initialState:{
        boardData: {},
        cardTitle: '',
        test: {},

    },
    reducers: { 
        setCardTitle: {
            reducer: (state, { payload }) => { 
                state.cardTitle = payload; 
            },
            prepare: (e) => { return { payload: e.target.value }}
        },
        setListTitle: {
            reducer: (state, { payload }) => { 
                state.cardTitle = payload; 
            },
            prepare: (e) => { return { payload: e.target.value }}
        },
    },
    extraReducers: {
        [getBoardData.fulfilled]: (state, { payload }) => {
            state.boardData = payload;
        },
        [handleAddCard.fulfilled]: (state, { payload }) => {
            state.boardData.cardIds[payload._id] = payload;
            state.cardTitle = '';
        },
    }
});

export const { setCardTitleText } = boardData.actions;

export { boardData, getBoardData, handleAddCard  };