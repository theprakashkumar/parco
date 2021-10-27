import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./request";

const exploreSlice = createSlice({
    name: "explore",
    initialState: {
        users: [],
        userStatus: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.userStatus = "pending";
        },
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload.user;
            state.userStatus = "received";
        },
        [getUsers.rejected]: (state, action) => {
            state.userStatus = "rejected";
            state.error = action.payload;
        },
    },
});

export default exploreSlice.reducer;
export const {} = exploreSlice.actions;
