import React from "react";
import github from "./github.png";
import "./footer.css";
const Footer = () => {
  return (
    <div className="ml-5 mr-5 mt-5 pb-4 pb-md-0">
      <footer className="d-flex flex-wrap justify-content-between ">
        <p className="mr-2">Developed by Ismael Ponce</p>
        <a href="https://github.com/pontzi">
          <img className="githubIcon" src={github} alt="Github" />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
