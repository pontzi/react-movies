import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useMoviesValidation from "./hooks/useMoviesValidation";
import { pageVariant } from "../helpers/pageVariants";
import { Helmet } from "react-helmet";
import "./mylist.css";

const MyList = () => {
  const { moviesWithoutRepeating, onHandleDelete } = useMoviesValidation();

  if (!moviesWithoutRepeating || moviesWithoutRepeating.length === 0) {
    return (
      <motion.div
        className="myListContainer viewportHeight container"
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariant}
      >
        <Helmet>
          <title>My list</title>
          <meta
            name="description"
            content="Page to see all your favorites movies"
          />
        </Helmet>
        <h3 className="noMoviesTitle">No movies yet</h3>
        <Link to="/">Go and add some movies to your list!</Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial="out" animate="in" exit="out" variants={pageVariant}>
      <Helmet>
        <title>My list</title>
        <meta
          name="description"
          content="Page to see all your favorites movies"
        />
      </Helmet>
      <div className={"myListContainer container"}>
        <h2 className="myListTitle mt-2">My list</h2>

        <div className="align-items-center row">
          {moviesWithoutRepeating.map((movie) => (
            <div
              className="d-flex justify-content-center mt-4 col-12 col-md-6 col-lg-4 col-xl-3"
              key={movie.id}
            >
              <div className="myListItem">
                <img
                  className="myListItem-poster"
                  src={
                    !movie.poster_path
                      ? "https://picsum.photos/720"
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  alt="Poster"
                />

                <img
                  onClick={() => onHandleDelete(movie.id)}
                  src="https://image.flaticon.com/icons/svg/2716/2716329.svg"
                  alt="Delete Icon"
                  className="myListItem-deleteIcon"
                />

                <div className="myListItem-details">
                  <p className="myListItem-details__title">{movie.title}</p>
                  <p className="myListItem-details__runtime">{`${movie.runtime} min`}</p>
                  <Link
                    to={{
                      pathname: `/description/${movie.id}`,
                      state: {
                        ...movie,
                        poster_path:
                          movie.poster_path || "https://picsum.photos/720",
                      },
                    }}
                  >
                    <p className="myListItem-details__description">
                      Read full description
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyList;
