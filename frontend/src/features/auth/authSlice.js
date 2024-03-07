const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    //Login
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,

    //Register
    register: false,
    registering: false,
};

const authSLice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Login
        login(state, action) {
            state.logging = true;
        },
        loginSuccess(state, action) {
            state.logging = false;
            state.currentUser = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },

        //Register
        register(state, action) {
            state.registering = true;
        },
        registerSuccess(state, action) {
            state.registering = false;
        },
    },
});

// Actions
export const authActions = authSLice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
export const selectIsRegister = (state) => state.auth.registering;

// Reducer
const authReducer = authSLice.reducer;
export default authReducer;
