// @ts-nocheck
//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adding: false,
    added: false,
    data: [],
    error: null,
}

const addToCartSlice = createSlice({
    name: 'addToCart',
    initialState,
    reducers: {
        addToCartStart: (state, {payload}) => {
            state.adding = true;
            state.added = false;
            state.data = payload;
            state.error = null;
        },
        addToCartSuccess: (state, {payload}) => {
            state.adding = false;
            state.added = true;
            state.data = payload;
            state.error = null;
        },
        addToCartError: (state, {payload}) => {
            state.adding = false;
            state.added = false;
            state.data = [];
            state.error = payload;
        },
    }
});

export const {
    addToCartStart,
    addToCartSuccess, 
    addToCartError,
} = addToCartSlice.actions

export default addToCartSlice.reducer;