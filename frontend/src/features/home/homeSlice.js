import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    arraySuggestFollow: [],
    arraySuggestFriend: [],
    objByActionFollow: undefined,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        fetchSuggestFollow(state, action) {
            state.loading = true;
        },

        fetchArraySuggestFollowSuccess(state, action) {
            state.loading = false;
            state.arraySuggestFollow = action.payload;
        },

        sendRequestToFollow(state, action) {},

        responseFollow(state, action) {
            state.objByActionFollow = action.payload;
        },
    },
});

// Actions
export const homeActions = homeSlice.actions;

// Selectors
export const selectLoading = (state) => state.home.loading;
export const selectArraySuggestFollow = (state) =>
    state.home.arraySuggestFollow;
export const selectArraySuggestFriend = (state) =>
    state.home.arraySuggestFriend;

export const selectFollowStatus = (state) => state.home.objByActionFollow;

// Reducer
const homeReducer = homeSlice.reducer;
export default homeReducer;
