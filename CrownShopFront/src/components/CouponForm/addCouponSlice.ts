//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    sending: false,
    sended: false,
    data: {},
    error: null,
}

const addCouponSlice = createSlice({
    name: 'addCoupon',
    initialState,
    reducers: {
        addCouponInit: (state, {payload}) => {
            state.sending = true;
            state.sended = false;
            state.data = payload;
            state.error = null;
        },
        addCouponSuccess: (state, {payload}) => {
            state.sending = false;
            state.sended = true;
            state.data = payload;
            state.error = null;
        },
        addCouponError: (state, {payload}) => {
            state.sending = false;
            state.sended = false;
            state.data = {};
            state.error = payload;
        },
    },
})

export const {
    addCouponInit,
    addCouponSuccess,
    addCouponError,
} = addCouponSlice.actions

export default addCouponSlice.reducer;