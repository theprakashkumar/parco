import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const logInWithCredential = createAsyncThunk(
    "auth/logInWithCredential",
    async ({ password, email }) => {
        try {
            const response = await axios.post("/user/login", {
                email,
                password,
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log("Something Went Wrong While Logging In!", error);
            return error.response;
        }
    }
);

const signUp = createAsyncThunk(
    "auth/signUp",
    async ({ name, username, email, password }) => {
        try {
            const response = await axios.post("/user/signup", {
                name,
                username,
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.log("Something Went Wrong While Signup", error);
            return error.response;
        }
    }
);

const follow = createAsyncThunk("auth/follow", async (userId) => {
    try {
        const response = await axios.put(`/action/follow/${userId}`);
        return response.data;
    } catch (error) {
        console.log("Something Went Wrong While Following the User!");
        return error.response;
    }
});

const unFollow = createAsyncThunk("auth/unfollow", async (userId) => {
    try {
        const response = await axios.delete(`/action/unfollow/${userId}`);
        return response.data;
    } catch (error) {
        console.log("Something Went Wrong While Unfollowing the User!");
        return error.response;
    }
});

export { logInWithCredential, signUp, follow, unFollow };
