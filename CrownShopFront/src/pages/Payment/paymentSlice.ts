//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    loading: false,
    success: false,
    data: {},
    error: null,
}

const paymentSlice = createSlice({
    name: "paymanet",
    initialState,
    reducers: {
        paymentInit: (state, {payload}) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.data = {}
        },

        paymentSuccess: (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.data = payload;
        },

        paymentError: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
            state.success = false;
            state.data = {};
        },
    },
});

export const {
    paymentInit,
    paymentSuccess,
    paymentError,
} = paymentSlice.actions;


export default paymentSlice.reducer;
