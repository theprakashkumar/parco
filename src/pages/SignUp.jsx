import "./SignUp.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../features/auth/request";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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

  const validatePassword = (password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(password);
  };

  const validateEmail = (email) => {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPassword = validatePassword(userDetails.password);
    const isValidEmail = validateEmail(userDetails.email);
    if (!isValidEmail) {
      return toast("Please enter valid email!");
    } else if (!isValidPassword) {
      toast(
        "Password should be minimum eight characters, at least one letter and one number!"
      );
    } else {
      dispatch(signUp({ ...userDetails }));
    }
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
      <div className="sign-up-from-container">
        <div className="heading heading--h4 sign-up-heading">
          Create Account!
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-text-wrapper mb-1">
            <input
              className="input-text  input-text-full-name"
              type="text"
              placeholder="Full Name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-text-wrapper mb-1">
            <input
              className="input-text  input-text-username"
              type="text"
              placeholder="Username"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-text-wrapper mb-1">
            <input
              className="input-text input-text-email"
              type="text"
              placeholder="Email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-text-wrapper">
            <input
              className="input-text input-text-password"
              type="password"
              placeholder="Password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn--lg sign-up-btn mt-1"
            disabled={
              !userDetails.name ||
              !userDetails.username ||
              !userDetails.email ||
              !userDetails.password
            }
          >
            SIGN UP
          </button>
        </form>
        <Link className="btn btn--link signup-btn-link mt-1" to="/login">
          Login Instead?
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
