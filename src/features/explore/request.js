import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUsers = createAsyncThunk("explore/gerUser", async () => {
    try {
        const response = await axios.get("/user/all");
        return response.data;
    } catch (error) {
        return error.response;
    }
});

export { getUsers };
