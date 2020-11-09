import { combineReducers } from '@reduxjs/toolkit';
import { boardData } from './board/slices/board-slice';
import { cardMenuData } from './board/slices/card-menu-slice';
import { itemMenuData } from './board/slices/item-menu-slice';

export const rootReducer = combineReducers({
    boardData: boardData.reducer,
    cardMenuData: cardMenuData.reducer,
    itemMenuData: itemMenuData.reducer,
});