import { createSlice } from "@reduxjs/toolkit";

export const pawSlice = createSlice({
    name: "paw",
    initialState: {
        pet: []
    },
    reducers: {
        setPaw: (state, action) => {
            state.pet = action.payload;
        }
    }
});

export const { setPaw } = pawSlice.actions;

export default pawSlice.reducer;