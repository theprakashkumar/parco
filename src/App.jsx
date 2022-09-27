import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes";
import Feed from "./pages/Feed";
import PostPage from "./pages/PostPage";
import Explore from "./pages/Explore";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Setting from "./pages/Setting";
import { initializeAuthUser } from "./features/auth/request";
import { getFeed } from "./features/post/request";

function App() {
    const dispatch = useDispatch();
    const { userId, isUserLoggedIn } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isUserLoggedIn) {
            dispatch(initializeAuthUser(userId));
            dispatch(getFeed());
        }
    }, []);
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <PrivateRoutes path="/" element={<Feed />} />
                <PrivateRoutes path="/post/:id" element={<PostPage />} />

                <PrivateRoutes path="/explore" element={<Explore />} />
                <PrivateRoutes
                    path="/notification"
                    element={<Notification />}
                />
                <PrivateRoutes path="/profile/:userId" element={<Profile />} />
                <PrivateRoutes
                    path="/profile/:userId/setting"
                    element={<Setting />}
                />
            </Routes>
        </div>
    );
}

export default App;
