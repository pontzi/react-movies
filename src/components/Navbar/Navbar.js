import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <div className="navbar d-flex justify-content-between align-items-center">
      <div className="navbarLeft d-flex align-items-center">
        <Link to="/">
          <p className="mr-2">Most popular</p>
        </Link>
        <Link to="/">
          <p className="mr-2">Highest rated</p>
        </Link>
        <Link to="/">
          <p className="mr-2">Best drama's</p>
        </Link>
        <Link to="/">
          <p>My list</p>
        </Link>
      </div>
      <div className="navbarRight d-flex align-items-center">
        <input
          className="mr-2 inputNavbar"
          placeholder="Search a movie"
          type="text"
        />

        <Link to="/">
          <p>Most popular</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
