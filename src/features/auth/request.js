import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const logInWithCredential = createAsyncThunk(
    "auth/logInWithCredential",
    async (email, password) => {
        try {
            const response = await axios.post("/users/login", {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.log("Something Went Wrong While Logging In!", error);
            return error.response;
        }
    }
);

export { logInWithCredential };

// if (response.data.success) {
// setLogin(true);
// setUserDetails({
//     userId: response.data.id,
//     name: response.data.name,
//     email: response.data.email,
//     token: response.data.token,
// });
// localStorage?.setItem(
//     "login",
//     JSON.stringify({
//         isUserLogin: true,
//         userDetails: {
//             userId: response.data.id,
//             name: response.data.name,
//             email: response.data.email,
//             token: response.data.token,
//         },
//     })
// );
