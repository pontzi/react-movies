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
    const popularQuery = await fetch(`${baseUrl}${popular}&api_key=${apiKey}`);
    const kidsQuery = await fetch(`${baseUrl}${kids}&api_key=${apiKey}`);
    const oldQuery = await fetch(`${baseUrl}${old}&api_key=${apiKey}`);
    const dramaQuery = await fetch(`${baseUrl}${drama}&api_key=${apiKey}`);
    const fictionQuery = await fetch(`${baseUrl}${fiction}&api_key=${apiKey}`);

    const popularJson = await popularQuery.json();
    const kidsJson = await kidsQuery.json();
    const oldJson = await oldQuery.json();
    const dramaJson = await dramaQuery.json();
    const fictionJson = await fictionQuery.json();

    const popularResults = popularJson.results;
    const kidsResults = kidsJson.results;
    const oldResults = oldJson.results;
    const dramaResults = dramaJson.results;
    const fictionResults = fictionJson.results;

    const promisePopularResults = popularResults.map((movie) =>
      getFinalData(movie, apiKey)
    );
    const promiseKidsResults = kidsResults.map((movie) =>
      getFinalData(movie, apiKey)
    );
    const promiseOldResults = oldResults.map((movie) =>
      getFinalData(movie, apiKey)
    );
    const promiseDramaResults = dramaResults.map((movie) =>
      getFinalData(movie, apiKey)
    );
    const promiseFictionResults = fictionResults.map((movie) =>
      getFinalData(movie, apiKey)
    );

    const finalPopularResults = await Promise.all(promisePopularResults);
    const finalKidsResults = await Promise.all(promiseKidsResults);
    const finalOldResults = await Promise.all(promiseOldResults);
    const finalDramaResults = await Promise.all(promiseDramaResults);
    const finalFictionResults = await Promise.all(promiseFictionResults);

    const allMovies = finalPopularResults.concat(
      finalKidsResults,
      finalOldResults,
      finalDramaResults,
      finalFictionResults
    );

    setMovies({
      popular: finalPopularResults,
      kids: finalKidsResults,
      old: finalOldResults,
      drama: finalDramaResults,
      fiction: finalFictionResults,
      allMovies,
    });
  };
  const setToMyList = (movieID, status) => {
    if (status === undefined) {
      setMyMoviesList({
        ...myMoviesList,
        [movieID]: movieID,
      });
      return;
    }
    if (status === null) {
      setMyMoviesList({
        ...myMoviesList,
        [movieID]: movieID,
      });
      return;
    }
    if (status === true) {
      setMyMoviesList({
        ...myMoviesList,
        [movieID]: undefined,
      });
      return;
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
  }, []);

  return (
    <Provider value={{ movies, myMoviesList, setToMyList }}>
      {children}
    </Provider>
  );
};

export { MoviesProvider, Consumer, MoviesContext };
