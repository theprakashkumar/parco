import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProfile = createAsyncThunk(
    "profile/getProfile",
    async ({ userId }) => {
        try {
            const response = await axios.get(`/user/${userId}`);
            console.log(response.data.user);
            return response.data;
        } catch (error) {
            console.log("Something Went Wrong While Fetching User Data", error);
            return error.response;
        }
    }
);

export { getProfile };
