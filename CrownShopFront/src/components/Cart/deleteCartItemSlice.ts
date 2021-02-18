// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: null,
    error: null,
    deleting: false,
    deleted: false
}

const deleteCartItemSlice = createSlice({
    name: 'deleteCartItem',
    initialState,
    reducers: {
        deleteCartItemInit: (state, {payload}) => {
            state.deleting = true;
            state.deleted = false;
            state.cart = null;
            state.error = null;
        },
        deleteCartItemSuccess: (state, {payload}) => {
            state.deleting = false;
            state.deleted = true;
            state.cart = payload;
            state.error = null;
        },
        deleteCartItemError: (state, {payload}) => {
            state.deleting = false;
            state.deleted = false;
            state.cart = null;
            state.error = payload;
        },
    }
});

export const {
    deleteCartItemInit,
    deleteCartItemSuccess, 
    deleteCartItemError,
} = deleteCartItemSlice.actions

export default deleteCartItemSlice.reducer; 