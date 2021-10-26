import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { userId } = useSelector((state) => state.auth);
    return (
        <div className="nav">
            <Link className="nav__logo" to="/">
                Parco
            </Link>
            <div className="nav__menu">
                <NavLink
                    activeClassName="nav__item-active"
                    className="nav__item"
                    to="/"
                >
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            home
                        </span>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="nav__item-active"
                    className="nav__item"
                    to="/explore"
                >
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            explore
                        </span>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="nav__item-active"
                    className="nav__item"
                    to="/notification"
                >
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            notifications
                        </span>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="nav__item-active"
                    className="nav__item"
                    to={`/profile/${userId}`}
                >
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            person
                        </span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
