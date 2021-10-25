import { createSlice } from "@reduxjs/toolkit";
import { newPost } from "./request";

const postSlice = createSlice({
    name: "post",
    initialState: {
        postStatus: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [newPost.pending]: (state) => {
            state.postStatus = "loading";
        },
        [newPost.fulfilled]: (state, action) => {
            state.postStatus = "posted";
        },
        [newPost.rejected]: (state, action) => {
            state.postStatus = "error";
            state.error = action.payload;
        },
    },
});

export default postSlice.reducer;
export const {} = postSlice.actions;
