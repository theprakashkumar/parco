import { createSlice } from "@reduxjs/toolkit";
import { logInWithCredential, signUp } from "./request";
import { useNavigate } from "react-router";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: JSON.parse(localStorage.getItem("token")) || null,
        userId: JSON.parse(localStorage.getItem("userId")) || null,
        name: JSON.parse(localStorage.getItem("name")) || null,
        username: JSON.parse(localStorage.getItem("username")) || null,
        isUserLoggedIn:
            JSON.parse(localStorage.getItem("isUserLoggedIn")) || false,
        status: JSON.parse(localStorage.getItem("token")) ? "received" : "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("name");
            localStorage.removeItem("username");
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("status");
            state.token = null;
            state.userId = null;
            state.name = null;
            state.username = null;
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
                const { id, username, name, token } = action.payload;
                state.token = token;
                state.userId = id;
                state.name = name;
                state.username = username;
                state.isUserLoggedIn = true;
                state.status = "fulfilled";
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("userId", JSON.stringify(id));
                localStorage.setItem("name", JSON.stringify(name));
                localStorage.setItem("username", JSON.stringify(username));
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
                const { id, username, name, token } = action.payload;
                state.token = token;
                state.userId = id;
                state.name = name;
                state.username = username;
                state.isUserLoggedIn = true;
                state.status = "fulfilled";
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("userId", JSON.stringify(id));
                localStorage.setItem("name", JSON.stringify(name));
                localStorage.setItem("username", JSON.stringify(username));
                localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
            }
        },
        [signUp.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
