import React from "react";
import video from "./joker.mp4";
const Video = () => {
  return (
    <video class="movie" controls>
      <source src={video} />
    </video>
  );
};

export default Video;
