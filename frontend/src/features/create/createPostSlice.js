import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: undefined,
};

const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers: {
        createNewPost(state, action) {},
        deletePost(state, action) {},
        fetchPostCreate(state, action) {
            state.data = action.payload;
        },
    },
});

// Actions
export const createPostActions = createPostSlice.actions;

// Selectors
export const selectPost = (state) => state.createPost.data;

// Reducer
const createPostReducer = createPostSlice.reducer;
export default createPostReducer;
