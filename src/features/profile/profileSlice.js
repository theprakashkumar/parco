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
            state.profile = action.payload;
            state.post = action.payload.post;
            state.profileStatus = "fulfilled";
        },
        [getProfile.rejected]: (state, action) => {
            state.profileStatus = "rejected";
            state.error = action.payload;
        },
    },
});

export default profileSlice.reducer;
