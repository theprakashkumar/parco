import "./Login.css";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { logInWithCredential } from "../features/auth/request";

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
        dispatch(
            logInWithCredential({
                password: "guest",
                email: "guest@gmail.com",
            })
        );
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {isUserLoggedIn ? (
                <Navigate to="/" replace={true} />
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
