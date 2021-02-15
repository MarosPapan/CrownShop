//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    loaded: false,
    data: [],
    error: null,
}

const getDetailProductSlice = createSlice({
    name: 'getDetailProduct',
    initialState,
    reducers: {
        getDetailProductInit: (state, {payload}) => {
            state.loading = true;
            state.loaded = false;
            state.data = payload;
            state.error = null;
        },
        getDetailProductSuccess: (state, {payload}) => {
            state.loading = false;
            state.loaded = true;
            state.data = payload;
            state.error = null;
        },
        getDetailProductError: (state, {payload}) => {
            state.loading = false;
            state.loaded = false;
            state.data = [];
            state.error = payload;
        },
    }
});

export const {
    getDetailProductInit,
    getDetailProductSuccess, 
    getDetailProductError,
} = getDetailProductSlice.actions

export default getDetailProductSlice.reducer;