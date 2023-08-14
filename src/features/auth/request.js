import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const logInWithCredential = createAsyncThunk(
  "auth/logInWithCredential",
  async ({ password, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      console.log(response.status);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, username, email, password }, { rejectWithValue }) => {
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
      toast(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const initializeAuthUser = createAsyncThunk(
  "auth/initializeAuthUser",
  async (userId, { rejectWithValue }) => {
    console.log("ini");
    try {
      const response = await axios.get(`/user/initialize/${userId}`);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("Something Went Wrong While Initializing the User!");
      console.log({ error });
      return rejectWithValue(error.response.data);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Something Went Wrong While Unfollowing the User!");
    return error.response;
  }
});

const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (
    { userId, name, username, description, profilePhoto },
    { rejectWithValue }
  ) => {
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
      toast(error.response.data.message);
      return rejectWithValue(error.response.data);
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
