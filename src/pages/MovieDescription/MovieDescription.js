import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { movieDescriptionPageVariants } from "../helpers/pageVariants";
import back from "./back.png";
import "./movieDescription.css";

const MovieDescription = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!props.location.state) {
    return (
      <div className="descriptionMovieContainer container">
        <h2>No movies yet</h2>
        <Link to="/">
          <p>Back to home</p>
        </Link>
      </div>
    );
  }
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

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={movieDescriptionPageVariants}
      className="container descriptionMovieContainer"
    >
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="Page to know all information about your selected movie"
        />
      </Helmet>
      <div className="detailsMovieContainer">
        <h2 className="detailsMovieContainer-title mb-4">{title}</h2>

        <img
          src={
            poster_path === "https://picsum.photos/720"
              ? "https://picsum.photos/720"
              : `https://image.tmdb.org/t/p/w500${poster_path}`
          }
          alt="Poster path"
          className="detailsMovieContainer-movieImg"
        />

        <p className="mt-4">
          <b>Duration:</b> <span>{runtime} min</span>
        </p>
        <p>
          <b>Language:</b> <span>{original_language}</span>
        </p>
        <p>
          <b>Description:</b> <span>{overview}</span>
        </p>
        <p>
          <b>Popularity:</b> <span>{popularity}</span>
        </p>
        <p>
          <b>Vote average:</b> <span>{vote_average}</span>
        </p>
        <p>
          <b>Total votes:</b> <span>{vote_count}</span>
        </p>
        <p>
          <b>Release date:</b> <span>{release_date}</span>
        </p>
      </div>
      <div className="detailsMovieContainer-goBack">
        <img
          onClick={() => props.history.goBack()}
          className="detailsMovieContainer-goBack__icon"
          src={back}
          alt="Go back"
        />
        <p>Go back</p>
      </div>
    </motion.div>
  );
};

export default MovieDescription;
