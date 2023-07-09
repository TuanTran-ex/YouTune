import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    createMode: false,
    deleteMode: false,
};

const createPostSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers: {
        createNewPost(state, action) {},
        deletePost(state, action) {},
        createNewPostSuccess(state, action) {
            state.createMode = true;
            state.data = action.payload;
        },
        deletePostSuccess(state, action) {
            state.deleteMode = true;
        },
    },
});

// Actions
export const createPostActions = createPostSlice.actions;

// Selectors
export const selectCreateMode = (state) => state.createPost.createMode;
export const selectDeleteMode = (state) => state.createPost.deleteMode;

// Reducer
const createPostReducer = createPostSlice.reducer;
export default createPostReducer;
