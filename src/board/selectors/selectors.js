// Selections from boardData slice
export const boardData = (state) => state.boardData.boardData;

export const cardIds = (state) => state.boardData.boardData.cardIds;

export const cardTitle = (state) => state.boardData.cardTitle;

export const expandCardInput = (state) => state.boardData.expandCardInput;

export const listTitle = (state) => state.boardData.listTitle;

export const renderAddCard = (state) => state.boardData.renderAddCard;

// Selections from cardMenuData slice
export const displayCardMenu = (state) => state.cardMenuData.displayCardMenu;

export const CardMenuOffsets = (state) => state.cardMenuData.offsets;

export const cardMenuCardId = (state) => state.cardMenuData.cardId;

// Selections from itemMenuData slice
export const displayItemMenu = (state) => state.itemMenuData.displayItemMenu;

export const itemMenuExpandInput = (state) => state.itemMenuData.expandInput;

export const itemMenuCardId = (state) => state.itemMenuData.cardId;

export const itemMenuItemId = (state) => state.itemMenuData.itemId;