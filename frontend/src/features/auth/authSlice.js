const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    isLoggedIn: false,
    logging: false,
    loggedFailed: false,
    currentUser: undefined,
    //Register
    registering: false,
    registeredFailed: false,
    profileUser: undefined,
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
            state.loggedFailed = false;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action) {
            state.logging = false;
            state.loggedFailed = true;
        },
        logout(state) {
            state.isLoggedIn = false; //out login
            state.currentUser = undefined;
        },

        //Register
        register(state, action) {
            state.registering = true;
        },
        registerSuccess(state, action) {
            state.registering = false;
            state.profileUser = action.payload; //set profile user
        },
        registerFailed(state, action) {
            state.logging = false;
            state.loggedFailed = true;
        },
    },
});

// Actions
export const authActions = authSLice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;
export const selectIsLoggedFailed = (state) => state.auth.loggedFailed;

// Reducer
const authReducer = authSLice.reducer;
export default authReducer;
