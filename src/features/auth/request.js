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
            console.log("da", response.data);
            return response.data;
        } catch (error) {
            console.log("Something Went Wrong While Logging In!", error);
            return error.response;
        }
    }
);

export { logInWithCredential };
