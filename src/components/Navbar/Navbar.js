import React, { useState, useContext } from "react";
import { MoviesContext } from "../../context/MoviesProvider";
import { Link } from "react-router-dom";
import search from "./search.png";
import logo from "./logo.png";
import "./navbar.css";

const Navbar = () => {
  const { setQueryValue } = useContext(MoviesContext);
  const [state, setState] = useState({
    background: null,
    search: null,
  });

  window.onscroll = function () {
    onHandleScroll();
  };

  function onHandleScroll() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setState({
        ...state,
        background: "navBackground",
      });
    } else {
      setState({
        ...state,
        background: "",
      });
    }
  }
  const onHandleClick = () => {
    setState({
      ...state,
      search: true,
    });
  };
  const onHandleFocusOut = () => {
    setState({
      ...state,
      search: null,
    });
  };

  return (
    <div
      className={`navbar d-flex flex-wrap justify-content-between align-items-center position-fixed sticky-top w-100 ${state.background}`}
    >
      <div className="navbarLeft d-flex align-items-center ">
        <Link to="/">
          <img src={logo} className="logo" alt="Logo" />
        </Link>
        <Link to="/">
          <p className="navbarItem mr-2">Most popular</p>
        </Link>
        <Link to="/">
          <p className="navbarItem mr-2">Highest rated</p>
        </Link>
      </div>
      <div className="navbarRight d-flex align-items-center">
        {state.search === null && (
          <img
            onClick={onHandleClick}
            className="search"
            src={search}
            alt="search"
          />
        )}
        {state.search && (
          <div className="inputContainer">
            <input
              className="navbarInput"
              type="text"
              placeholder="Search a movie"
              autoFocus
              onBlur={onHandleFocusOut}
              onChange={setQueryValue}
            />
          </div>
        )}

        <Link to="/">
          <p>My list</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
