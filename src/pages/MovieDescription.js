import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./movieDescription.css";
import back from "./back.png";

const MovieDescription = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    original_language,
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average,
    vote_count,
  } = props.location.state;

  const pageVariants = {
    in: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: "-100vw",
      y: 0,
      scale: 0.8,
    },
  };

  const pageTransition = {};

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="container descriptionMovieContainer"
    >
      <div className="detailsMovieContainer">
        <h2 className="title mb-4">{title}</h2>
        {poster_path !== "https://picsum.photos/720" && (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="Poster path"
            className="descriptionMovieImg"
          />
        )}
        {poster_path === "https://picsum.photos/720" && (
          <img
            src={poster_path}
            alt="Poster path"
            className="descriptionMovieImg"
          />
        )}

        <p className="duration mt-4">
          <b>Duration:</b> <span>{runtime} min</span>
        </p>
        <p className="language">
          <b>Language:</b> <span>{original_language}</span>
        </p>
        <p className="descript">
          <b>Description:</b> <span>{overview}</span>
        </p>
        <p className="popularity">
          <b>Popularity:</b> <span>{popularity}</span>
        </p>
        <p className="vote_average">
          <b>Vote average:</b> <span>{vote_average}</span>
        </p>
        <p className="total_votes">
          <b>Total votes:</b> <span>{vote_count}</span>
        </p>
        <p className="release_date">
          <b>Release date:</b> <span>{release_date}</span>
        </p>
      </div>
      <div className="goBack">
        <Link to="/">
          <img className="goBackIcon" src={back} alt="Go back" />
        </Link>
        <p>Go back</p>
      </div>
    </motion.div>
  );
};

export default MovieDescription;
