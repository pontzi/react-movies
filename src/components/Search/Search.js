import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesProvider";
import "../carousel/carousel.css";
import "./search.css";

const Search = (props) => {
  const { movies } = useContext(MoviesContext);
  const { allMovies } = movies;
  let moviesData = undefined;
  const currentQuery = props.match.params.searchName;

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
      <div>
        <div className={"searchResultsContainer container"}>
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
  }
  return <div></div>;
};

export default Search;
