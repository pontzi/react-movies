import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import swal from "sweetalert";
import { MoviesContext } from "../../context/MoviesProvider";
import deleteIcon from "./delete.png";

import "./mylist.css";

const MyList = () => {
  const [viewportHeight, setViewportHeight] = useState("");
  const { myMoviesList, setToMyList, movies } = useContext(MoviesContext);
  const { allMovies } = movies;
  let moviesWithoutRepeating = [];
  useEffect(() => {
    if (moviesWithoutRepeating.length <= 4) {
      setViewportHeight("viewportHeight");
    }
  }, [moviesWithoutRepeating]);
  if (!allMovies) {
    return (
      <div className="myListContainer container">
        <h2 className="noMoviesTitle">No movies yet!</h2>
      </div>
    );
  }

  const moviesValues = Object.values(myMoviesList);
  const newMoviesList = moviesValues.filter((movie) => movie !== undefined);
  const filteredMovies = allMovies.filter((movie) =>
    newMoviesList.includes(movie.id)
  );

  moviesWithoutRepeating = filteredMovies.filter(
    (currentMovie, currentIndex, array) => {
      return (
        array.findIndex(
          (arrayElement) =>
            JSON.stringify(arrayElement) === JSON.stringify(currentMovie)
        ) === currentIndex
      );
    }
  );
  const pageVariant = {
    in: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    out: {
      opacity: 0,
      x: "-100vw",
      y: 0,
    },
  };

  const onHandleDelete = (movieID) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it will disappear from your favorites list",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setToMyList(movieID, true);
      } else {
        swal("Your movie is safe! ☺");
      }
    });
  };
  if (moviesWithoutRepeating.length === 0) {
    return (
      <motion.div
        className="myListContainer viewportHeight container"
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariant}
      >
        <h3 className="noMoviesTitle">Your list is empty</h3>
        <Link to="/">Go and add some movies to your list!</Link>
      </motion.div>
    );
  }
  return (
    <motion.div initial="out" animate="in" exit="out" variants={pageVariant}>
      <div className={`myListContainer ${viewportHeight} container`}>
        <h2 className="myListTitle mt-2">My list</h2>

        <div className="align-items-center row">
          {moviesWithoutRepeating.map((movie) => (
            <div
              className="myListItem mt-4 col-12 col-md-6 col-lg-4 col-xl-3"
              key={movie.id}
            >
              {!movie.poster_path && (
                <img
                  className="listItemPoster"
                  src="https://picsum.photos/720"
                  alt="Poster"
                />
              )}
              {movie.poster_path && (
                <img
                  className="listItemPoster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Poster"
                />
              )}

              <img
                onClick={() => onHandleDelete(movie.id)}
                src={deleteIcon}
                alt="Delete Icon"
                className="deleteIcon"
              />

              <div className="listItemDetails">
                <p className="listItemDetails-title">{movie.title}</p>
                <p className="listItemDetails-runtime">{`${movie.runtime} min`}</p>
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
                  <p className="listItemDetails-description">
                    Read full description
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyList;
