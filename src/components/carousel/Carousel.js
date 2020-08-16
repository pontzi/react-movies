import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useCarouselLogic from "./hooks/useCarouselLogic";
import { MoviesContext } from "../../context/MoviesProvider";
import Loader from "../Loader/Loader";
import "./carousel.css";

const Carousel = (props) => {
  const { myMoviesList } = useContext(MoviesContext);
  const { categoryKey, title } = props;
  const [addToMyList, assignCategory] = useCarouselLogic();

  const categoryData = assignCategory(categoryKey);

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
              <img
                className="carousel-item__poster"
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
                className="carousel-item_details--heart"
              />

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
