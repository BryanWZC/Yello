// External modules
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Internal modules
import { fetchJsonData } from '../utility/image-data';
import { updateBackground } from '../utility/update-background';
import { boardData } from '../../base-board/slices/board-slice';

/**
 * Fetch initial unsplash json data featuring first 10 images from page 1 
 */
const fetchImageJson = createAsyncThunk(
    'background/fetchPhotosJson',
    async(page, { getState }) => {
        const { confirmedSearchQuery } = getState().backgroundData;
        return {
            imageJsonData: await fetchJsonData(confirmedSearchQuery, page),
        };
    }
);

/**
 * Updates background image in db and boardData state in base-board.
 */
const changeBackground = createAsyncThunk(
    'background/changeBackground',
    async(index, { getState }) => {
        const { _id: boardId } = getState().boardData.boardData;
        const { filteredImageJson } = getState().backgroundData;
        const backgroundLink = filteredImageJson.results[index].full;
        updateBackground({ boardId, backgroundLink });
        return {
            background: backgroundLink,
        };
    }
)

export const backgroundData = createSlice({
    name: 'background',
    initialState: {
        displayImageSearch: false,
        searchQuery: '',
        confirmedSearchQuery: '',
        page: 1,
        filteredImageJson: null,
        imageLoaded: false,
    },
    reducers: { 
        enableImageSearch: (state) => {
            state.displayImageSearch = true;
        },
        searchInputOnChange: {
            reducer: (state, { payload }) => {
                state.searchQuery = payload;
            },
            /**
             * Modifies search query input on change
             */
            prepare: (e) => {
                e.persist();
                return {
                    payload: e.target.value,
                }
            }
        },
        confirmQuery: (state)=> {
            state.confirmedSearchQuery = state.searchQuery;
        },
        IncreasePageByOne: (state) => { 
            state.page += 1 
        },
        DecreasePageByOne: (state) => {
            state.page -= 1;
        },
        disableImageSearch: (state) => {
            state.displayImageSearch = false;
            state.searchQuery = '';
            state.page = 1;
            state.filteredImageJson = null;
            state.imageLoaded = false;
        },
    },
    extraReducers: { 
        [fetchImageJson.fulfilled]: (state, { payload }) => {
            const { imageJsonData } = payload;
            state.filteredImageJson = imageJsonData;
            state.imageLoaded = true;
        }
    }
});

export const { enableImageSearch, searchInputOnChange, confirmQuery, IncreasePageByOne, DecreasePageByOne, disableImageSearch } = backgroundData.actions;

export { fetchImageJson, changeBackground }