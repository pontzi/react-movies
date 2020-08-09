import React, { useRef, useState, useEffect } from "react";
import video from "./joker.mp4";
import unmute from "./unmute.png";
import mute from "./mute.png";
import "./video.css";
import PageVisibility from "react-page-visibility";

const Video = () => {
  const [status, setStatus] = useState({
    volume: null,
  });
  const vid = useRef();
  useEffect(() => {
    const observer = new window.IntersectionObserver(function (entries) {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        vid.current.play();
      } else {
        vid.current.pause();
      }
    });
    observer.observe(vid.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  //-------------------------------------------------------
  const muteUnmute = () => {
    if (vid.current.muted === false) {
      vid.current.muted = true;
      setStatus({
        ...status,
        volume: false,
      });
    } else {
      vid.current.muted = false;
      setStatus({
        ...status,
        volume: true,
      });
    }
  };

  const handleVisibilityChange = (isVisible) => {
    if (isVisible) {
      vid.current.play();
    } else {
      vid.current.pause();
    }
  };
  return (
    <PageVisibility onChange={handleVisibilityChange}>
      <div className="videoContainer">
        <video ref={vid} className="video" loop autoPlay muted preload="true">
          <source src={video} />
        </video>

        {!status.volume && (
          <div onClick={muteUnmute} className="muteUnmute">
            <img src={mute} alt="mute" />
          </div>
        )}
        {status.volume && (
          <div onClick={muteUnmute} className="muteUnmute">
            <img className="muteUnmuteIcon" src={unmute} alt="unmute" />
          </div>
        )}
        <div className="details">
          <div className="titleContainer">
            <h2 className="mainVideoTitle">JOKER (2019)</h2>
          </div>
          <div className="descriptionContainer">
            <p className="mainVideoDescription">
              In Gotham City, mentally troubled comedian Arthur Fleck is
              disregarded and mistreated by society. He then embarks on a
              downward spiral of revolution and bloody crime. This path brings
              him face-to-face with his alter-ego: the Joker.
            </p>
          </div>
        </div>
      </div>
    </PageVisibility>
  );
};

export default Video;
