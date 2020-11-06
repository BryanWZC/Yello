import { combineReducers } from '@reduxjs/toolkit';
import { boardData } from './boardReducers';

const rootReducer = combineReducers({
    boardData: boardData.reducer
});

export default rootReducer;