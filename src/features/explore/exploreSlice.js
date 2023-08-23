import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./request";

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    users: [],
    userStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.userStatus = "pendingExplore";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload.user;
      state.userStatus = "receivedExplore";
    },
    [getUsers.rejected]: (state, action) => {
      state.userStatus = "rejectedExplore";
      state.error = action.payload;
    },
  },
});

export default exploreSlice.reducer;
// eslint-disable-next-line
export const {} = exploreSlice.actions;
