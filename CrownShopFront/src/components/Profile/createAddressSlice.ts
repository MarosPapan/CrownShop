//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    creating: false, 
    created: false,
    address: {},
    error: null,
}

const createAddressSlice = createSlice({
    name: 'createAddress',
    initialState,
    reducers: {
        createAddressInit: (state, {payload}) => {
            state.creating = true; 
            state.created = false;
            state.address = {};
            state.error = null;
        },
        updateAddressInit: (state, {payload}) => {
            state.creating = true; 
            state.created = false;
            state.address = {};
            state.error = null;
        },
        deleteAddressInit: (state, {payload}) => {
            state.creating = true; 
            state.created = false;
            state.address = {};
            state.error = null;
        },
        createAddressSuccess: (state, {payload}) => {
            state.creating = false; 
            state.created = true;
            state.address = payload;
            state.error = null;
        },
        createAddressError: (state, {payload}) => {
            state.creating = false; 
            state.created = false;
            state.address = {};
            state.error = payload;
        },
    },
});

export const { 
    createAddressInit, 
    createAddressSuccess, 
    createAddressError, 
    updateAddressInit, 
    deleteAddressInit 
} = createAddressSlice.actions;
export default createAddressSlice.reducer;