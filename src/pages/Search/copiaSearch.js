import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesProvider";
import "./search.css";

const Search = (props) => {
  const { movies, myMoviesList, setToMyList } = useContext(MoviesContext);
  const { allMovies } = movies;
  let moviesData = undefined;

  const currentQuery = props.match.params.searchName;

  let moviesWithoutRepeating = [];

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
    switch (result) {
      case undefined:
        setToMyList(movieID, undefined);
        break;
      case null:
        setToMyList(movieID, null);
        break;
      case true:
        setToMyList(movieID, true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className={"searchResultsContainer container"}>
        <h2 className="searchTitle ">Results</h2>
        <div className="align-items-center row">
          {moviesWithoutRepeating.map((movie) => (
            <div
              className="d-flex justify-content-center mt-4 col-12 col-md-6 col-lg-4 col-xl-3"
              key={movie.id}
            >
              <div className="searchItem">
                <img
                  className="searchItem-searchPoster"
                  src={
                    !movie.poster_path
                      ? "https://picsum.photos/720"
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  alt="Poster"
                />

                <img
                  onClick={() => addToMyList(movie.id)}
                  src={
                    myMoviesList[`${movie.id}`]
                      ? "https://image.flaticon.com/icons/svg/535/535183.svg"
                      : "https://image.flaticon.com/icons/svg/535/535234.svg"
                  }
                  alt="Heart"
                  className="searchItem-heart"
                />

                <div className="searchItem-searchDetails">
                  <p className="seartchItem-searchDetails__title">
                    {movie.title}
                  </p>
                  <p className="searchItem-searchDetails__runtime">{`${movie.runtime} min`}</p>
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
                    <p className="searchItem-searchDetails__description">
                      Read full description
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Search;
