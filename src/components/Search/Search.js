import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesProvider";
import "../carousel/carousel.css";
import "./search.css";
import redHeart from "../carousel/redHeart.png";
import blackHeart from "../carousel/blackHeart.png";

const Search = (props) => {
  const [viewportHeight, setViewportHeight] = useState("");
  const { movies, myMoviesList, setToMyList } = useContext(MoviesContext);
  const { allMovies } = movies;
  let moviesData = undefined;

  const currentQuery = props.match.params.searchName;

  let moviesWithoutRepeating = [];
  useEffect(() => {
    if (moviesWithoutRepeating.length <= 4) {
      setViewportHeight("viewportHeight");
    }
  }, [moviesWithoutRepeating]);

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
    moviesWithoutRepeating = moviesData.filter(
      (currentMovie, currentIndex, array) => {
        return (
          array.findIndex(
            (arrayElement) =>
              JSON.stringify(arrayElement) === JSON.stringify(currentMovie)
          ) === currentIndex
        );
      }
    );
  }
  const validation = (movieID) => {
    const entries = Object.entries(myMoviesList);

    const id = movieID.toString();

    const result = entries.filter((entry) => entry[0] === id);

    if (result.length > 0) {
      if (result[0][1] === undefined) {
        return undefined;
      }
      if (result[0][1]) {
        return true;
      }
    } else {
      return null;
    }
  };
  const addToMyList = (movieID) => {
    const result = validation(movieID);
    if (result === undefined) {
      setToMyList(movieID, undefined);
      return;
    }
    if (result === null) {
      setToMyList(movieID, null);
      return;
    }
    if (result === true) {
      setToMyList(movieID, true);
      return;
    }
  };

  return (
    <div>
      <div className={`searchResultsContainer ${viewportHeight} container`}>
        <h2 className="searchTitle mt-2">Results</h2>
        <div className="align-items-center row">
          {moviesWithoutRepeating.map((movie) => (
            <div
              className="searchItem mt-4 col-12 col-md-6 col-lg-4 col-xl-3"
              key={movie.id}
            >
              {!movie.poster_path && (
                <img
                  className="searchPoster"
                  src="https://picsum.photos/720"
                  alt="Poster"
                />
              )}
              {movie.poster_path && (
                <img
                  className="searchPoster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Poster"
                />
              )}
              {myMoviesList[`${movie.id}`] ? (
                <img
                  onClick={() => addToMyList(movie.id)}
                  src={redHeart}
                  alt="Heart"
                  className="searchItemHeart"
                />
              ) : (
                <img
                  onClick={() => addToMyList(movie.id)}
                  src={blackHeart}
                  alt="Heart"
                  className="searchItemHeart"
                />
              )}

              <div className="searchDetails">
                <p className="searchDetails-title">{movie.title}</p>
                <p className="searchDetails-runtime">{`${movie.runtime} min`}</p>
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
                  <p className="searchDetails-description">
                    Read full description
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Search;
