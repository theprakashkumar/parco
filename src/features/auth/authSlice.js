import { createSlice } from "@reduxjs/toolkit";
import { logInWithCredential } from "./request";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: JSON.parse(localStorage.getItem("token")) || null,
        userId: JSON.parse(localStorage.getItem("userId")) || null,
        name: JSON.parse(localStorage.getItem("name")) || null,
        isUserLoggedIn:
            JSON.parse(localStorage.getItem("isUserLoggedIn")) || false,
        status: JSON.parse(localStorage.getItem("token"))
            ? "received"
            : "ideal",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [logInWithCredential.pending]: (state) => {
            state.status = "pending";
        },
        [logInWithCredential.fulfilled]: (state, action) => {
            const { id, email, username, name, token } = action.payload;
            state.token = token;
            state.userId = id;
            state.name = name;
            state.isUserLoggedIn = true;
            state.status = "fulfilled";
        },
        [logInWithCredential.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
    },
});

export default authSlice.reducer;
