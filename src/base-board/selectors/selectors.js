// Selections from boardData slice
export const boardData = (state) => state.boardData.boardData;

export const background = (state) => state.boardData.background;

export const loadedBackground = (state) => state.boardData.loadedBackground;

export const blurHash = (state) => state.boardData.blurHash;

export const backgroundColor = (state) => state.boardData.backgroundColor

export const cardIds = (state) => state.boardData.boardData.cardIds;

export const cardTitle = (state) => state.boardData.cardTitle;

export const expandCardInput = (state) => state.boardData.expandCardInput;

export const expandListInput = (state) => state.boardData.expandListInput;

export const listTitle = (state) => state.boardData.listTitle;

export const renderAddCard = (state) => state.boardData.renderAddCard;


// Selections from cardMenuData slice
export const displayCardMenu = (state) => state.cardMenuData.displayCardMenu;

export const CardMenuOffsets = (state) => state.cardMenuData.offsets;

export const cardMenuCardId = (state) => state.cardMenuData.cardId;

export const renameOverlayActive = (state) => state.cardMenuData.renameOverlayActive;

// Selections from itemMenuData slice
export const displayItemMenu = (state) => state.itemMenuData.displayItemMenu;

export const itemMenuExpandInput = (state) => state.itemMenuData.expandInput;

export const itemMenuCardId = (state) => state.itemMenuData.cardId;

export const itemMenuItemId = (state) => state.itemMenuData.itemId;