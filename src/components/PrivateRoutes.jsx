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
<<<<<<< HEAD
    return isUserLoggedIn ? (
        <Route to={path} {...props} />
    ) : (
        <Navigate state={{ from: path }} to="/login" />
=======
    return (
        <>
            isUserLoggedIn ? (
            <Route path="/login" {...props} />
            ) : (
            <Navigate state={{ from: path }} to="/login" />)
        </>
>>>>>>> b44f162720eed33affa52b562eb76d7ab0ed612b
    );
};

export default PrivateRoutes;
<<<<<<< HEAD
=======

// isUserLoggedIn ? (
//     <Route path="/login" {...props} />
// ) : (
//     <Navigate state={{ from: path }} to="/login" />
// );
>>>>>>> b44f162720eed33affa52b562eb76d7ab0ed612b
