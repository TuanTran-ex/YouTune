import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    userProfile: {},
    wardList: [],
    avatar: {},
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        fetchProfileData(state, action) {
            state.loading = true;
        },
        fetchProfileDataSuccess(state, action) {
            state.loading = false;
            state.userProfile = action.payload;
        },
        updateProfile(state, action) {},

        // Image
        fetchProfileImage(state, action) {},
        updateProfileImageSuccess(state, action) {
            state.avatar = action.payload;
        },

        //Password
        updatePassword(state, action) {},
    },
});

// Actions
export const profileActions = profileSlice.actions;

// Selectors
export const selectLoading = (state) => state.profile.loading;
export const selectProfileData = (state) => state.profile.userProfile;
export const selectAvatar = (state) => state.profile.avatar;

// Reducer
const profileReducer = profileSlice.reducer;
export default profileReducer;
