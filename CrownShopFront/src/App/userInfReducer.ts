//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    isLoggedIn: false,
}

const userloggedInSlice = createSlice({
    name: 'userInf',
    initialState,
    reducers: {
        userLoggedInSuccess: (state, {payload}) => {
            state.username = payload;
            state.isLoggedIn = true;
        },
        userLoggedInFail: (state) => {
            state.username = "";
            state.isLoggedIn = false;
    }, 
    },
});

export const {userLoggedInFail, userLoggedInSuccess} = userloggedInSlice.actions;

export default userloggedInSlice.reducer;