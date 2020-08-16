import { useState, useEffect } from "react";

const useNavbarChanges = (props) => {
  const [state, setState] = useState({
    background: null,
    search: null,
    value: "",
  });

  useEffect(() => {
    if (state.value === "") {
      props.history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.value]);

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

  const onHandleChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
    });
    props.history.push(`/search/${e.target.value}`);
  };
  return [state, onHandleClick, onHandleFocusOut, onHandleChange];
};

export default useNavbarChanges;
