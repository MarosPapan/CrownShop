//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInf: '',
    logged: false,
    error: null,
}

const getUserSlice = createSlice({
    name: 'getUser',
    initialState, 
    reducers: {
        userGetInit: (state) => {
            state.logged = false;
            state.userInf = '';
            state.error = null;
        },
        userGetSuccess: (state, {payload}) => {
            state.logged = true;
            state.userInf = payload;
            state.error = null;
        }, 
        userGetError: (state, {payload}) => {
            state.logged = false;
            state.userInf = '';
            state.error = payload;
        },
    },

});

export const {userGetSuccess, userGetError, userGetInit} = getUserSlice.actions;

export default getUserSlice.reducer;
