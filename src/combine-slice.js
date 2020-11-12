// External modules
import { combineReducers } from '@reduxjs/toolkit';

// Internal modules - base-background feature
import { boardData } from './base-board/slices/board-slice';
import { cardMenuData } from './base-board/slices/card-menu-slice';
import { itemMenuData } from './base-board/slices/item-menu-slice';

// Internal modules - unsplash-image-picker feature
import { backgroundData } from './unsplash-image-picker/slices/background-slice';

export const rootReducer = combineReducers({
    boardData: boardData.reducer,
    cardMenuData: cardMenuData.reducer,
    itemMenuData: itemMenuData.reducer,
    backgroundData: backgroundData.reducer,
});