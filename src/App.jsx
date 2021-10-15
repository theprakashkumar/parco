import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <PrivateRoutes path="/" element={<Feed />} />
                <PrivateRoutes path="/explore" element={<Explore />} />
                <PrivateRoutes
                    path="/notification"
                    element={<Notification />}
                />
                <PrivateRoutes path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
