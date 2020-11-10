import { combineReducers } from '@reduxjs/toolkit';
import { boardData } from './base-board/slices/board-slice';
import { cardMenuData } from './base-board/slices/card-menu-slice';
import { itemMenuData } from './base-board/slices/item-menu-slice';

export const rootReducer = combineReducers({
    boardData: boardData.reducer,
    cardMenuData: cardMenuData.reducer,
    itemMenuData: itemMenuData.reducer,
});