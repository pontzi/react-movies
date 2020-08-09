import React, { useState, useEffect } from "react";
import {
  popularMovies,
  kidsMovies,
  oldMovies,
  dramaClassics,
  scienceFiction,
} from "../pages/helpers/categories";

let MoviesContext = React.createContext();
let { Provider, Consumer } = MoviesContext;

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState({});
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

  const getData = async (categoryURL, categoryName) => {
    const query = await fetch(`${baseUrl}${categoryURL}&api_key=${apiKey}`);

    const { results } = await query.json();

    const promiseFinalDataArray = results.map((movie) =>
      getFinalData(movie, apiKey)
    );

    const finalData = await Promise.all(promiseFinalDataArray);

    setMovies({
      ...movies,
      [categoryName]: finalData,
    });
  };

  const allMovieData = () => {
    const allMovies = movies.popular.concat(
      movies.kids,
      movies.old,
      movies.drama,
      movies.fiction
    );
    setMovies({
      ...movies,
      all: allMovies,
    });
  };
  useEffect(() => {
    const getAllData = async () => {
      await getData(popularMovies, "popular");
      await getData(kidsMovies, "kids");
      await getData(oldMovies, "old");
      await getData(dramaClassics, "drama");
      await getData(scienceFiction, "fiction");
      console.log(movies);
      // await allMovieData();
    };
    getAllData();
  });

  return <Provider value={{ movies, setMovies }}>{children}</Provider>;
};

export { MoviesProvider, Consumer, MoviesContext };
