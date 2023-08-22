import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

const getFeed = createAsyncThunk("post/feed", async () => {
  try {
    const response = await axios.get("/feed");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
});

const likePost = createAsyncThunk("post/likePost", async ({ postId }) => {
  try {
    const response = await axios.put(`/action/like/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
});

const removeLikePost = createAsyncThunk(
  "post/removeLikePost",
  async ({ postId }) => {
    try {
      const response = await axios.delete(`/action/like/${postId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
);
const commentPost = createAsyncThunk(
  "post/commentPost",
  async ({ postId, content }) => {
    try {
      const response = await axios.put(`/action/comment/${postId}`, {
        content,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
);

const getSinglePost = createAsyncThunk(
  "/post/getSinglePost",
  async ({ postId }) => {
    try {
      const response = await axios.get(`/post/${postId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
);
// const deletePost;`

export {
  newPost,
  getFeed,
  likePost,
  removeLikePost,
  commentPost,
  getSinglePost,
};
