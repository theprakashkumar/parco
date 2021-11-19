import { createSlice } from "@reduxjs/toolkit";
import {
    logInWithCredential,
    signUp,
    follow,
    unFollow,
    updateUser,
    initializeAuthUser,
} from "./request";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: JSON.parse(localStorage.getItem("token")) || null,
        userId: JSON.parse(localStorage.getItem("userId")) || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
        isUserLoggedIn:
            JSON.parse(localStorage.getItem("isUserLoggedIn")) || false,
        status: JSON.parse(localStorage.getItem("token")) ? "received" : "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("user");
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("status");
            state.token = null;
            state.userId = null;
            state.user = null;
            state.isUserLoggedIn = false;
            state.status = "idle";
        },
    },
    extraReducers: {
        [logInWithCredential.pending]: (state) => {
            state.status = "pending";
        },
        [logInWithCredential.fulfilled]: (state, action) => {
            if (action.payload.success) {
                const { id, user, token } = action.payload;
                state.token = token;
                state.userId = id;
                state.user = user;
                state.isUserLoggedIn = true;
                state.status = "fulfilled";
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("userId", JSON.stringify(id));
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
            }
        },
        [logInWithCredential.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        [signUp.pending]: (state) => {
            state.status = "pending";
        },
        [signUp.fulfilled]: (state, action) => {
            if (action.payload.success) {
                const { id, user, token } = action.payload;
                state.token = token;
                state.userId = id;
                state.user = user;
                state.isUserLoggedIn = true;
                state.status = "fulfilled";
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("userId", JSON.stringify(id));
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
            }
        },
        [signUp.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        [initializeAuthUser.pending]: (state) => {
            state.status = "pending";
        },
        [initializeAuthUser.fulfilled]: (state, action) => {
            const { success, user } = action.payload;
            if (success) {
                state.user = user;
                state.status = "fulfilled";
                localStorage.setItem("user", JSON.stringify(user));
            }
        },
        [initializeAuthUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        [follow.pending]: (state) => {
            state.status = "following";
        },
        [follow.fulfilled]: (state, action) => {
            const { followedId } = action.payload;
            state.user.following.push(followedId);
            state.status = "followed";
        },
        [follow.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        [unFollow.pending]: (state) => {
            state.status = "unFollowing";
        },
        [unFollow.fulfilled]: (state, action) => {
            const { unFollowedId } = action.payload;
            state.user.following.splice(
                state.user.following.indexOf(unFollowedId),
                1
            );
            state.status = "unFollowed";
        },
        [unFollow.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        [updateUser.pending]: (state) => {
            state.status = "updatingUser";
        },
        [updateUser.fulfilled]: (state, action) => {
            const { name, username, description, profilePhoto } =
                action.payload.user;
            state.user.name = name;
            state.user.username = username;
            state.user.description = description;
            state.user.profilePhoto = profilePhoto;
            state.status = "userUpdated";
        },
        [updateUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
