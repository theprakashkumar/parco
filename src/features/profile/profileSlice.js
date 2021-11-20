import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./request";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: {},
        post: [],
        profileStatus: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [getProfile.pending]: (state) => {
            state.profileStatus = "pending";
        },
        [getProfile.fulfilled]: (state, action) => {
            const { user, post } = action.payload;
            state.profile = user;
            state.post = post;
            state.profileStatus = "fulfilled";
        },
        [getProfile.rejected]: (state, action) => {
            state.profileStatus = "rejected";
            state.error = action.payload;
        },
    },
});

export default profileSlice.reducer;
