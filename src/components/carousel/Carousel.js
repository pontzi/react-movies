import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesProvider";
import Loader from "../Loader/Loader";
import "./carousel.css";

const Carousel = (props) => {
  const { movies } = useContext(MoviesContext);
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
