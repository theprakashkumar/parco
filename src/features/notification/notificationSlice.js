import { createSlice } from "@reduxjs/toolkit";
import { getNotification } from "./request";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        notificationStatus: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [getNotification.pending]: (state) => {
            state.notificationStatus = "pending";
        },
        [getNotification.fulfilled]: (state, action) => {
            state.notifications = action.payload.notification;
            state.notificationStatus = "receivedNotification";
        },
        [getNotification.rejected]: (state, action) => {
            state.notificationStatus = "rejectedNotification";
            state.error = action.payload;
        },
    },
});

export default notificationSlice.reducer;
export const {} = notificationSlice.actions;
