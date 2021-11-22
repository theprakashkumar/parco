import "./SignUp.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../features/auth/request";

import { useNavigate } from "react-router";

const initialUserDetails = {
    name: "",
    username: "",
    email: "",
    password: "",
};

const SignUp = () => {
    const [userDetails, setUserDetails] = useState(initialUserDetails);
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signUp({ ...userDetails }));
    };

    const handleChange = (e) => {
        setUserDetails((userDetails) => ({
            ...userDetails,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        const redirect = () => {
            if (isUserLoggedIn) {
                navigate("/");
            }
        };
        redirect();
    }, [isUserLoggedIn]);
    return (
        <div className="signup">
            <div className="sign-up-from-container">
                <div className="heading heading--h4 sign-up-heading">
                    Create Account!
                </div>

                <form onSubmit={handleSubmit}>
                    <div class="input-text-wrapper mb-1">
                        <input
                            class="input-text  input-text-full-name"
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="input-text-wrapper mb-1">
                        <input
                            class="input-text  input-text-username"
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="input-text-wrapper mb-1">
                        <input
                            class="input-text input-text-email"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div class="input-text-wrapper">
                        <input
                            class="input-text input-text-password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button class="btn btn--lg sign-up-btn mt-1">
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
