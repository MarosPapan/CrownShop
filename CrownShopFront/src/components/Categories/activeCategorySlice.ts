//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    category: '',
}

const activeCategorySlice = createSlice({
    name: 'activeCategory',
    initialState,
    reducers: {
        activeCategoryInit: (state, {payload}) => {
            state.category = payload;
        },
    },
})

export const {
    activeCategoryInit,
} = activeCategorySlice.actions

export default activeCategorySlice.reducer;