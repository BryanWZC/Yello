// NOTE: import * as selectTwo to avoid name clash with base-board selectors as 'select'

// selections from background slice
export const backgroundDisplayImageSearch = (state) => state.backgroundData.displayImageSearch;

export const backgroundSearchQuery = (state) => state.backgroundData.searchQuery;

export const backgroundPage = (state) => state.backgroundData.page;

export const backgroundImageJson = (state) => state.backgroundData.filteredImageJson;

export const backgroundSelectionImageLoaded = (state) => state.backgroundData.imageLoaded;