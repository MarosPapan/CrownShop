//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    creating: false, 
    created: false,
    data: {},
    error: null,
}

const signUpUserSlice = createSlice({
    name: 'signUpUser',
    initialState,
    reducers: {
        createUserInit: (state, {payload}) => {
            state.creating = true; 
            state.created = false;
            state.data = {};
            state.error = null;
        },
        createUserSuccess: (state, {payload}) => {
            state.creating = false; 
            state.created = true;
            state.data = payload;
            state.error = null;
        },
        createUserError: (state, {payload}) => {
            state.creating = false; 
            state.created = false;
            state.data = {};
            state.error = payload;
        },
    },
});

export const { createUserInit, createUserSuccess, createUserError } = signUpUserSlice.actions;
export default signUpUserSlice.reducer;