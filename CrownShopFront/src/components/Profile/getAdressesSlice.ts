//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    loaded: false,
    data: [],
    error: null,
}

const getAddressesSlice = createSlice({
    name: 'getAdresses',
    initialState,
    reducers: {
        getAdressesInit: (state, {payload}) => {
            state.loading = true;
            state.loaded = false;
            state.data = payload;
            state.error = null;
        },
        getAdressesSuccess: (state, {payload}) => {
            state.loading = false;
            state.loaded = true;
            state.data = payload;
            state.error = null;
        },
        getAdressesError: (state, {payload}) => {
            state.loading = false;
            state.loaded = false;
            state.data = [];
            state.error = payload;
        },
    }
});

export const {
    getAdressesInit,
    getAdressesSuccess, 
    getAdressesError
} = getAddressesSlice.actions

export default getAddressesSlice.reducer;
