import { createSlice } from "@reduxjs/toolkit";
import {
    getProfile,
    profileLike,
    profileRemoveLike,
    profileComment,
} from "./request";

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
            state.profileStatus = "gettingProfile";
        },
        [getProfile.fulfilled]: (state, action) => {
            const { user, post } = action.payload;
            state.profile = user;
            state.post = post;
            state.profileStatus = "gotProfile";
        },
        [getProfile.rejected]: (state, action) => {
            state.profileStatus = "getProfileError";
            state.error = action.payload;
        },
        [profileLike.pending]: (state) => {
            state.profileStatus = "linkingPost";
        },
        [profileLike.fulfilled]: (state, action) => {
            const { success, postId, likes } = action.payload;
            if (success) {
                state.post = state.post.map((post) => {
                    if (post._id === postId) {
                        post.likes = likes;
                    }
                    return post;
                });
            }
            state.profileStatus = "likedPost";
        },
        [profileLike.rejected]: (state, action) => {
            state.profileStatus = "likeError";
            state.error = action.payload;
        },
        [profileRemoveLike.pending]: (state) => {
            state.profileStatus = "removingLikeOnPost";
        },
        [profileRemoveLike.fulfilled]: (state, action) => {
            const { success, postId, likes } = action.payload;

            if (success) {
                state.post = state.post.map((post) => {
                    if (post._id === postId) {
                        post.likes = likes;
                    }
                    return post;
                });
            }
            state.profileStatus = "removedLinkFromPost";
        },
        [profileRemoveLike.rejected]: (state, action) => {
            state.profileStatus = "likeError";
            state.error = action.payload;
        },
        [profileComment.rejected]: (state, action) => {
            state.profileStatus = "addCommentError";
            state.error = action.payload;
        },
        [profileComment.pending]: (state) => {
            state.profileStatus = "commentPostPending";
        },
        [profileComment.fulfilled]: (state, action) => {
            const { success, postId, comment } = action.payload;
            if (success) {
                state.post = state.post.map((post) => {
                    if (post._id === postId) {
                        post.comment = comment;
                    }
                    return post;
                });
            }
            state.profileStatus = "commentAddedPost";
        },
    },
});

export default profileSlice.reducer;
