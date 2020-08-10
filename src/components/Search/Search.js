import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesProvider";
import { motion } from "framer-motion";
import "../carousel/carousel.css";
import "./search.css";

const Search = () => {
  const { movies, query } = useContext(MoviesContext);
  const { allMovies } = movies;
  let moviesData = undefined;
  const currentQuery = query.query;
  const pageVariants = {
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };
  const pageTransition = {
    duration: 1,
  };

  if (!allMovies) {
    return <div></div>;
  }

  if (currentQuery) {
    moviesData = allMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(currentQuery.toLowerCase());
    });
    if (moviesData.length === 0) {
      return (
        <div className="notFoundContainer">
          <h2 className="notFound">Movie not found 😖</h2>
        </div>
      );
    }
    const moviesWithoutRepeating = moviesData.filter(
      (currentMovie, currentIndex, array) => {
        return (
          array.findIndex(
            (arrayElement) =>
              JSON.stringify(arrayElement) === JSON.stringify(currentMovie)
          ) === currentIndex
        );
      }
    );

    return (
      <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="carouselContainer">
          <h2 className="carousel-title mt-2">Results</h2>
          <div className="carousel align-items-center">
            {moviesWithoutRepeating.map((movie) => (
              <div className="carouselItem" key={movie.id}>
                {!movie.poster_path && (
                  <img
                    className="carousel-item__poster"
                    src="https://picsum.photos/720"
                    alt="Poster"
                  />
                )}
                {movie.poster_path && (
                  <img
                    className="carousel-item__poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Poster"
                  />
                )}

                <div className="carousel-item_details">
                  <p className="carousel-item__details--title">{movie.title}</p>
                  <p className="carousel-item__details--runtime">
                    {`${movie.runtime} min`}
                  </p>
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
                    <p className="carousel-item_details--description">
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
  }
  return <div></div>;
};

export default Search;
