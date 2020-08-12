import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoviesContext } from "../../context/MoviesProvider";
import "./mylist.css";

const MyList = () => {
  const { myMoviesList, movies } = useContext(MoviesContext);
  const { allMovies } = movies;

  const moviesValues = Object.values(myMoviesList);
  const newMoviesList = moviesValues.filter((movie) => movie !== undefined);

  const filteredMovies = allMovies.filter((movie) =>
    newMoviesList.includes(movie.id)
  );

  const moviesWithoutRepeating = filteredMovies.filter(
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

  return (
    <motion.div initial="out" animate="in" exit="out" variants={pageVariant}>
      <div className="myListContainer container">
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
