import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./carousel.css";
const Carousel = (props) => {
  const [movies, setMovies] = useState([]);
  const { category, title } = props;
  const apiKey = "4c33c096c97964f1af4afe925f4f5687";
  const baseUrl = "https://api.themoviedb.org/3";

  const getFinalData = async (movie, apiKey) => {
    const idQuery = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
    );

    const data = await idQuery.json();
    let time = await data.runtime;
    if (time === 0 || time === null) {
      const randomNumber = Math.floor(Math.random() * 150);
      time = randomNumber;
    }
    return {
      ...movie,
      runtime: time,
    };
  };

  const getData = async (category) => {
    const query = await fetch(`${baseUrl}${category}&api_key=${apiKey}`);

    const { results } = await query.json();

    const promiseFinalDataArray = results.map((movie) =>
      getFinalData(movie, apiKey)
    );

    const finalData = await Promise.all(promiseFinalDataArray);

    setMovies(finalData);
  };

  useEffect(() => {
    getData(category);
  }, []);

  return (
    <div>
      <div className="carouselContainer">
        <h2 className="carousel-title mt-2">{title}</h2>
        <div className="carousel align-items-center">
          {movies.map((movie) => (
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
                <Link to="/description">
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
