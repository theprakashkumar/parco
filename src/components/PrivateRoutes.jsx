import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoutes = ({ path, ...props }) => {
    const { isUserLoggedIn } = useSelector((state) => state.auth);

    return isUserLoggedIn ? (
        <Route to={path} {...props} />
    ) : (
        <Navigate state={{ from: path }} to="/login" />
    );
};

export default PrivateRoutes;
