import React from "react";
import "./footer.css";
import useVisibility from "./hooks/useVisibility";

const Footer = () => {
  const display = useVisibility();
  return (
    <div className={`fixed-bottom ${display} `}>
      <footer className="footerContainer">
        <p className="ml-5 mr-2">Developed by Ismael Ponce</p>
        <a href="https://github.com/pontzi">
          <img
            className="githubIcon ml-5 mr-5"
            src="https://image.flaticon.com/icons/svg/733/733609.svg"
            alt="Github"
          />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
