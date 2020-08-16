import React from "react";
import { Link, withRouter } from "react-router-dom";
import search from "./search.png";
import logo from "./logo.png";
import useNavbarChanges from "./hooks/useNavbarChanges";
import "./navbar.css";

const Navbar = (props) => {
  const [
    state,
    onHandleClick,
    onHandleFocusOut,
    onHandleChange,
  ] = useNavbarChanges(props);

  return (
    <div
      className={`navbar d-flex flex-wrap justify-content-between align-items-center position-fixed sticky-top w-100 ${state.background}`}
    >
      <div className="navbarLeft d-flex align-items-center ">
        <Link to="/">
          <img src={logo} className="navbarLeft-logo" alt="Logo" />
        </Link>
      </div>
      <div className="navbarRight d-flex align-items-center">
        {state.search === null ? (
          <img
            onClick={onHandleClick}
            className="navbarRight-search"
            src={search}
            alt="search"
          />
        ) : (
          <div className="navbarRight-inputContainer">
            <input
              className="navbarRight-inputContainer__navbarInput"
              type="text"
              placeholder="Search a movie"
              autoFocus
              onBlur={onHandleFocusOut}
              onChange={onHandleChange}
              value={state.value}
            />
          </div>
        )}
        <Link to="/mylist">
          <p>My list</p>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
