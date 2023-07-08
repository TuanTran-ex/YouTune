import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    response: false,
};

const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers: {
        createNewPost(state, action) {},
        deletePost(state, action) {},
        createNewPostSuccess(state, action) {
            state.response = true;
            state.data = action.payload;
        },
    },
});

// Actions
export const createPostActions = createPostSlice.actions;

// Selectors
export const selectPost = (state) => state.createPost.response;

// Reducer
const createPostReducer = createPostSlice.reducer;
export default createPostReducer;
