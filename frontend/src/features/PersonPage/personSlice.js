const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    userData: undefined,
};

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        fetchUserData(state, action) {},

        fetchUserDataSuccess(state, action) {
            state.userData = action.payload;
        },
    },
});

// Actions
export const personActions = personSlice.actions;

//Selectors
export const selectUserData = (state) => state.person.userData;

// Reducer
const personReducer = personSlice.reducer;
export default personReducer;
