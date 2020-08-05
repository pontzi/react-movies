import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Video from "../MainVideo/Video";
const Layout = (props) => {
  return (
    <div>
      <Navbar />
      <Video />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
