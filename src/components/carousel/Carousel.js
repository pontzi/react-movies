import React, { useEffect, useState } from "react";

import "./carousel.css";
const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const category = "/discover/movie?sort_by=popularity.desc";
  const apiKey = "4c33c096c97964f1af4afe925f4f5687";
  const baseUrl = "https://api.themoviedb.org/3";

  const getFinalData = async (movie, apiKey) => {
    const idQuery = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
    );

    const data = await idQuery.json();
    const id = await data.runtime;
    return {
      ...movie,
      runtime: id,
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
      <div className="carousel">
        <div className="trendingMovies">
          {movies.map((movie) => (
            <div className="carouselItem">
              <img
                className="carousel-item__poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Poster"
              />
              <div className="carousel-item_details">
                <div>
                  <img
                    className="carousel-item__details--playButton"
                    src=""
                    width="20px"
                    alt="Play button"
                  />
                  <img
                    className="carousel-item__details--plusButton"
                    src=""
                    width="20px"
                    alt="Plus button"
                  />
                </div>
                <p className="carousel-item__details--title">{movie.title}</p>
                <p className="carousel-item__details--runtime">
                  {`${movie.runtime} min`}
                </p>
                {/* <p className="carousel-item__details--description">
                  {movie.overview}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
