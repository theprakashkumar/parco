import { createSlice } from "@reduxjs/toolkit";
import { getFeed, newPost, likePost, removeLikePost } from "./request";

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
        [likePost.pending]: (state) => {
            state.postStatus = "linkingPost";
        },
        [likePost.fulfilled]: (state, action) => {
            const success = action.payload.success;
            const postId = action.payload.postId;
            const likes = action.payload.likes;
            if (success) {
                state.feedPost = state.feedPost.map((post) => {
                    if (post._id === postId) {
                        post.likes = likes;
                    }
                    return post;
                });
            }
            state.postStatus = "likedPost";
        },
        [likePost.rejected]: (state, action) => {
            state.postStatus = "likeError";
            state.error = action.payload;
        },
        [removeLikePost.pending]: (state) => {
            state.postStatus = "removingLikeOnPost";
        },
        [removeLikePost.fulfilled]: (state, action) => {
            const success = action.payload.success;
            const postId = action.payload.postId;
            const likes = action.payload.likes;
            if (success) {
                state.feedPost = state.feedPost.map((post) => {
                    if (post._id === postId) {
                        post.likes = likes;
                    }
                    return post;
                });
            }
            state.postStatus = "removedLinkFromPost";
        },
        [removeLikePost.rejected]: (state, action) => {
            state.postStatus = "removeLikeError";
            state.error = action.payload;
        },
    },
});

export default postSlice.reducer;
export const {} = postSlice.actions;
