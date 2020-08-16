import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./notFound.css";
const NotFound = () => {
  return (
    <div className=" notFoundContainer container text-center">
      <Helmet>
        <title>Error 404 Not Found</title>
      </Helmet>
      <div className="imageContainer">
        <img
          className="notFoundImg"
          src="https://image.flaticon.com/icons/svg/1373/1373151.svg"
          alt="Not Found"
        />
        <h1 className="font-weight-bold text-light">¡Error 404 Not Found!</h1>
        <Link to="/">
          <button className="btn btn-primary mt-2">Back to home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
