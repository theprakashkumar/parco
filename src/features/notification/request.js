import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getNotification = createAsyncThunk(
    "/notification/getNotification",
    async () => {
        try {
            const response = await axios.get("/notification");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return error.response;
        }
    }
);

export { getNotification };
