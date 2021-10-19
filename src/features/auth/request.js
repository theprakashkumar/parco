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
        console.log(name, email, password);
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

export { logInWithCredential, signUp };
