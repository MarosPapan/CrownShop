//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    loaded: false,
    data: [],
    error: null,
}

const getProductsSlice = createSlice({
    name: 'getProducts',
    initialState,
    reducers: {
        getProductsInit: (state) => {
            state.loading = true;
            state.loaded = false;
            state.data = [];
            state.error = null;
        },
        getProductsSuccess: (state, {payload}) => {
            state.loading = false;
            state.loaded = true;
            state.data = payload;
            state.error = null;
        },
        getProductsError: (state, {payload}) => {
            state.loading = false;
            state.loaded = false;
            state.data = [];
            state.error = payload;
        },
    }
});

export const {
    getProductsInit,
    getProductsSuccess, 
    getProductsError
} = getProductsSlice.actions

export default getProductsSlice.reducer;