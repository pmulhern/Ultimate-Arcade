import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li style={{color: "orange"}} className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li style={{color: "pink"}} className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li style={{color: "gold"}} className="nav-item nav-link">Register</li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/home">
          <li style={{color: "orange"}} className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/game">
          <li style={{color: "pink"}} className="nav-item nav-link">Play Game</li>
        </Link>

        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}
        <Link to="/">
          <button style={{color: "gold"}}
            type="button"
            className="btn btn-link nav-item nav-link"
            onClick={onClickLogoutHandler}
          >
            Logout
          </button>
        </Link>
      </>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/">
        <div style={{color: "yellow"}} className="navbar-brand">GamePortal</div>
      </Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
