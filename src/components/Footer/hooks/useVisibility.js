import { useEffect, useState } from "react";

const useVisibility = () => {
  const [display, setDisplay] = useState("isNotVisible");
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setDisplay("isVisible");
      } else {
        setDisplay("isNotVisible");
      }
    });
  }, []);
  return display;
};

export default useVisibility;
