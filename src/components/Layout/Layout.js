import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./layout.css";
const Layout = (props) => {
  return (
    <div className="parentContainer">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
