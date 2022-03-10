import "./Login.css";
import Avatar from "../assets/account_circle_black_48dp.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInWithCredential } from "../features/auth/request";
import { logout } from "../features/auth/authSlice";

const Login = () => {
    const [credential, setCredential] = useState({ email: "", password: "" });

    const { isUserLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCredential((credential) => ({
            ...credential,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(
            logInWithCredential({
                password: credential.password,
                email: credential.email,
            })
        );
    };

    const guestLogin = async (e) => {
        console.log("guest");
        dispatch(
            logInWithCredential({
                password: "guest",
                email: "guest@gmail.com",
            })
        );
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const clearCredential = () => {
        if (isUserLoggedIn) {
            setCredential({ email: "", password: "" });
        }
    };

    useEffect(() => {
        clearCredential();
    }, [isUserLoggedIn]);
    return (
        <div className="login">
            {isUserLoggedIn ? (
                <div className="logged-in-container">
                    <img
                        className="logged-in__image mt-2"
                        src={Avatar}
                        alt="Avatar Logo"
                    />
                    <div className="heading--h6 mt-1 mb-1">Hi {user.name}!</div>
                    <button className="btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    <div className="login-from-container">
                        <div className="heading heading--h4 login-heading">
                            Welcome Back!
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-text-wrapper mb-1">
                                <input
                                    className="input-text  input-text-email"
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={credential.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-text-wrapper">
                                <input
                                    className="input-text input-text-password"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={credential.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button className="btn btn--md login-btn login-btn-dark mt-1 mb-1">
                                Login
                            </button>
                        </form>

                        <button
                            onClick={guestLogin}
                            className="btn btn--md login-btn mb-1"
                        >
                            Login as Guest
                        </button>

                        <Link
                            className="btn btn--link login-btn-link"
                            to="/signup"
                        >
                            Don't Have Account Create One!
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Login;
