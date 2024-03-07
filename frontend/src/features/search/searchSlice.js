import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: undefined,
    listResult: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchUserInfo(state, action) {
            state.loading = true;
        },
        searchResult(state, action) {
            state.loading = false;
            state.listResult = action.payload;
        },
    },
});

// Actions
export const searchActions = searchSlice.actions;

// Selectors
export const selectLoading = (state) => state.search.loading;
export const selectResult = (state) => state.search.listResult;

// Reducer
const searchReducer = searchSlice.reducer;
export default searchReducer;
