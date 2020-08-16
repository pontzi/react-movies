import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./layout.css";
const Layout = (props) => {
  return (
    <div>
      <div className="parentContainer">
        <Navbar />
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
