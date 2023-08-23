import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProfile = createAsyncThunk(
  "profile/getProfile",
  async ({ userId }) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      console.log("Something Went Wrong While Fetching User Data", error);
      return error.response;
    }
  }
);

const profileLike = createAsyncThunk("profile/likePost", async ({ postId }) => {
  try {
    const response = await axios.put(`/action/like/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
});

const profileRemoveLike = createAsyncThunk(
  "profile/removeLikePost",
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
const profileComment = createAsyncThunk(
  "profile/commentPost",
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

export { getProfile, profileLike, profileRemoveLike, profileComment };
