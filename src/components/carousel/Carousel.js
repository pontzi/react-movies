import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesProvider";
import Loader from "../Loader/Loader";
import heart from "./heart.png";
import redHeart from "./redHeart.png";
import "./carousel.css";

const Carousel = (props) => {
  const { movies, myMoviesList, setToMyList } = useContext(MoviesContext);
  const { categoryKey, title } = props;

  const assignCategory = () => {
    switch (categoryKey) {
      case "popular":
        return movies.popular;
      case "drama":
        return movies.drama;
      case "old":
        return movies.old;
      case "fiction":
        return movies.fiction;
      case "kids":
        return movies.kids;
      default:
        break;
    }
  };
  const categoryData = assignCategory();
  if (!categoryData) {
    return <Loader />;
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
  const iconAddedRemoved = (movieID, list) => {
    if (list.movieID) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div className="carouselContainer">
        <h2 className="carousel-title mt-2">{title}</h2>
        <div className="carousel align-items-center">
          {categoryData.map((movie) => (
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
                <h1 onClick={() => addToMyList(movie.id)}>icon</h1>
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
    </div>
  );
};

export default Carousel;
