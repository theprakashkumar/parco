import { createSlice } from "@reduxjs/toolkit";
import { getFeed, newPost } from "./request";

const postSlice = createSlice({
    name: "post",
    initialState: {
        feedPost: [],
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
            state.postStatus = "newPostError";
            state.error = action.payload;
        },
        [getFeed.pending]: (state) => {
            state.postStatus = "pending";
        },
        [getFeed.fulfilled]: (state, action) => {
            state.feedPost = action.payload.feed;
            state.postStatus = "receivedFeed";
        },
        [getFeed.rejected]: (state, action) => {
            state.postStatus = "feedError";
            state.error = action.payload;
        },
    },
});

export default postSlice.reducer;
export const {} = postSlice.actions;
