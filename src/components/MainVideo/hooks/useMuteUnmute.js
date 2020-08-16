import { useState, useEffect } from "react";

const useMuteUnmute = (video) => {
  const [status, setStatus] = useState({
    volume: null,
  });

  const observer = new window.IntersectionObserver(function (entries) {
    const { isIntersecting } = entries[0];

    if (isIntersecting) {
      video.current.play();
    } else {
      video.current.pause();
    }
  });

  useEffect(() => {
    observer.observe(video.current);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const muteUnmute = () => {
    if (video.current.muted === false) {
      video.current.muted = true;
      setStatus({
        volume: false,
      });
    } else {
      video.current.muted = false;
      setStatus({
        volume: true,
      });
    }
  };
  const handleVisibilityChange = (isVisible) => {
    if (isVisible) {
      if (
        document.body.scrollTop > 600 ||
        document.documentElement.scrollTop > 600
      ) {
        video.current.pause();
      } else {
        video.current.play();
      }
    } else {
      video.current.pause();
    }
  };

  return [muteUnmute, handleVisibilityChange, status];
};

export default useMuteUnmute;
