// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: null,
    error: null,
    loading: false,
    loaded: false
}

const getCartItemsSlice = createSlice({
    name: 'getCartItems',
    initialState,
    reducers: {
        getCartItemsStart: (state) => {
            state.loading = true;
            state.loaded = false;
            state.cart = null;
            state.error = null;
        },
        getCartItemsSuccess: (state, {payload}) => {
            state.loading = false;
            state.loaded = true;
            state.cart = payload;
            state.error = null;
        },
        getCartItemsError: (state, {payload}) => {
            state.loading = false;
            state.loaded = false;
            state.cart = null;
            state.error = payload;
        },
        getCartItems404: (state, {payload}) => {
            state.loading = false;
            state.loaded = false;
            state.cart = null;
            state.error = "You do not have any active order";
        }, 
    }
});

export const {
    getCartItemsStart,
    getCartItemsSuccess, 
    getCartItemsError,
    getCartItems404,
} = getCartItemsSlice.actions

export default getCartItemsSlice.reducer; 