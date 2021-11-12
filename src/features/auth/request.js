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

const initializeAuthUser = createAsyncThunk(
    "auth/initializeAuthUser",
    async (userId) => {
        console.log("ini");
        try {
            const response = await axios.get(`/user/initialize/${userId}`);
            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.log("Something Went Wrong While Initializing the User!");
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

const updateUser = createAsyncThunk(
    "auth/updateUser",
    async ({ userId, name, username, description, profilePhoto }) => {
        try {
            const response = await axios.put(`/user/update/${userId}`, {
                name,
                username,
                description,
                profilePhoto,
            });
            console.log("user updated", response.data);
            return response.data;
        } catch (error) {
            console.log("Something Went Wrong While Updating the User!");
            return error.response;
        }
    }
);

export {
    logInWithCredential,
    signUp,
    follow,
    unFollow,
    updateUser,
    initializeAuthUser,
};
