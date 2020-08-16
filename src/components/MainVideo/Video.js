import React, { useRef } from "react";
import video from "./joker.mp4";
import unmute from "./unmute.png";
import mute from "./mute.png";
import useMuteUnmute from "./hooks/useMuteUnmute";
import PageVisibility from "react-page-visibility";
import "./video.css";

const Video = () => {
  const vid = useRef();
  const [muteUnmute, handleVisibilityChange, status] = useMuteUnmute(vid);

  return (
    <PageVisibility onChange={handleVisibilityChange}>
      <div className="videoContainer">
        <video ref={vid} className="video" loop autoPlay muted>
          <source src={video} />
        </video>

        <div onClick={muteUnmute} className="muteUnmute">
          <img src={!status.volume ? mute : unmute} alt="muteUnmute" />
        </div>

        <div className="details">
          <div className="details-titleContainer">
            <h2 className="details-titleContainer__mainVideoTitle">
              JOKER (2019)
            </h2>
          </div>
          <div className="details-descriptionContainer">
            <p className="details-descriptionContainer__mainVideoDescription">
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
