import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getFeed = createAsyncThunk("post/feed", async () => {
    try {
        const response = await axios.get("/feed");
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response;
    }
});

const newPost = createAsyncThunk("post/newPost", async ({ caption, photo }) => {
    try {
        const response = await axios.post("/post/new", {
            caption,
            photo,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response;
    }
});
// const getPost;
// const likePost;
// const unlikePost;
// const commentPost;
// const updatePost;
// const deletePost;`

export { getFeed, newPost };
