import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: "session",
    initialState: {
        user: null
    },
    reducers: {
        loginSession: (state, action) => {
            state.user = action.payload;
        },
        logoutSession: (state) => {
            state.user = null;
        }
    }
});

export const { loginSession, logoutSession } = sessionSlice.actions;

export default sessionSlice.reducer;