import React, { useState, useEffect } from "react";
import {
  popularMovies,
  kidsMovies,
  oldMovies,
  dramaClassics,
  scienceFiction,
} from "../pages/helpers/categories";

const MoviesContext = React.createContext();
const { Provider, Consumer } = MoviesContext;

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState({});
  const [myMoviesList, setMyMoviesList] = useState({});

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

  const getData = async (popular, kids, old, drama, fiction) => {
    const categoriesArr = [popular, kids, old, drama, fiction];
    const categoriesArrPromise = categoriesArr.map((category) =>
      fetch(`${baseUrl}${category}&api_key=${apiKey}`)
    );
    const categories = await Promise.all(categoriesArrPromise);
    const promiseCategoriesJson = categories.map((category) => category.json());
    const categoriesJson = await Promise.all(promiseCategoriesJson);
    const categoriesResults = categoriesJson.map(
      (category) => category.results
    );
    const promiseFinalCategoriesResults = categoriesResults.map(
      (categoryResult) =>
        categoryResult.map((movie) => getFinalData(movie, apiKey))
    );
    const finalCategoriesResults = await Promise.all(
      promiseFinalCategoriesResults.map(
        async (category) => await Promise.all(category)
      )
    );
    const allMovies = finalCategoriesResults[0].concat(
      finalCategoriesResults[1],
      finalCategoriesResults[2],
      finalCategoriesResults[3],
      finalCategoriesResults[4]
    );

    setMovies({
      popular: finalCategoriesResults[0],
      kids: finalCategoriesResults[1],
      old: finalCategoriesResults[2],
      drama: finalCategoriesResults[3],
      fiction: finalCategoriesResults[4],
      allMovies,
    });
  };
  const setToMyList = (movieID, status) => {
    switch (status) {
      case undefined:
        setMyMoviesList({
          ...myMoviesList,
          [movieID]: movieID,
        });
        break;
      case null:
        setMyMoviesList({
          ...myMoviesList,
          [movieID]: movieID,
        });
        break;
      case true:
        setMyMoviesList({
          ...myMoviesList,
          [movieID]: undefined,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getData(
      popularMovies,
      kidsMovies,
      oldMovies,
      dramaClassics,
      scienceFiction
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider value={{ movies, myMoviesList, setToMyList }}>
      {children}
    </Provider>
  );
};

export { MoviesProvider, Consumer, MoviesContext };
