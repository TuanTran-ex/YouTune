import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cityList: [],
    wardList: [],
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        fetchCityList(state, action) {},
        fetchCityListSuccess(state, action) {
            state.cityList = action.payload;
        },
        fetchWardListOfCity(state, action) {},
        fetchWardListOfCitySuccess(state, action) {
            state.wardList = action.payload;
        },
    },
});

// Actions
export const cityActions = citySlice.actions;

// Selectors
export const selectCityList = (state) => state.city.cityList;
export const selectWardList = (state) => state.city.wardList;

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
