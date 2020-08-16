import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="vh-100 container text-center">
      <div>
        <img
          src="https://image.flaticon.com/icons/svg/1373/1373151.svg"
          alt="Not Found"
        />
        <h1 className="font-weight-bold text-light">Error 404 Not Found!</h1>
        <Link to="/">
          <button className="btn btn-primary mt-2">Back to home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
