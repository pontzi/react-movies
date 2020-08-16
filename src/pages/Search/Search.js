import React from "react";
import { Link } from "react-router-dom";
import useSearchFilter from "./hooks/useSearchFilter";
import "./search.css";

const Search = (props) => {
  const { moviesWithoutRepeating, addToMyList, myMoviesList } = useSearchFilter(
    props
  );

  if (!moviesWithoutRepeating) {
    return (
      <div className="notFoundContainer">
        <h2 className="notFound">
          Movie not found{" "}
          <span role="img" aria-label="Emoji">
            😖
          </span>
        </h2>
      </div>
    );
  }

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
