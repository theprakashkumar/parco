// import { useSelector } from "react-redux";
// import { Route, Navigate } from "react-router-dom";
// import { store } from "../app/store";

// const PrivateRoute = ({ path, ...props }) => {
//     const { isUserLoggedIn } = useSelector((state) => state.auth);

//     console.log("hi")

//     return isUserLoggedIn ? (
//         <Route path={path} {...props} />
//     ) : (
//         <Navigate state={{ from: path }} to="/login" />
//     );
// };

// export default PrivateRoute;

import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoutes = ({ path, ...props }) => {
    const { isUserLoggedIn } = useSelector((state) => state.auth);

    console.log("user", { isUserLoggedIn });
    return (
        <>
            isUserLoggedIn ? (
            <Route path="/login" {...props} />
            ) : (
            <Navigate state={{ from: path }} to="/login" />)
        </>
    );
};

export default PrivateRoutes;

// isUserLoggedIn ? (
//     <Route path="/login" {...props} />
// ) : (
//     <Navigate state={{ from: path }} to="/login" />
// );
