import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import profileReducer from "../features/profile/profileSlice";
import exploreReducer from "../features/explore/exploreSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        profile: profileReducer,
        explore: exploreReducer,
    },
});
