// @ts-nocheck
//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    removing: false,
    removed: false,
    data: [],
    error: null,
}

const removeOneItemFromCartSlice = createSlice({
    name: 'removeOneItemFromCart',
    initialState,
    reducers: {
        removeOneItemFromCartStart: (state, {payload}) => {
            state.removing = true;
            state.removed = false;
            state.data = payload;
            state.error = null;
        },
        removeOneItemFromCartSuccess: (state, {payload}) => {
            state.removing = false;
            state.removed = true;
            state.data = payload;
            state.error = null;
        },
        removeOneItemFromCartError: (state, {payload}) => {
            state.removing = false;
            state.removed = false;
            state.data = [];
            state.error = payload;
        },
    }
});

export const {
    removeOneItemFromCartStart,
    removeOneItemFromCartSuccess, 
    removeOneItemFromCartError,
} = removeOneItemFromCartSlice.actions

export default removeOneItemFromCartSlice.reducer;