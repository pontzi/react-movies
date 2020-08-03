import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const apiKey = "4c33c096c97964f1af4afe925f4f5687";
  const baseUrl = "https://api.themoviedb.org/3/";
  const getData = async () => {
    const query = await fetch(
      `${baseUrl}discover/movie?sort_by=popularity.desc&api_key=${apiKey}`
    );
    const { results } = await query.json();
    setMovies(results);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <section className="trendingMovies">
        {movies.map((movie) => {
          console.log(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
          return (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Poster"
            />
          );
        })}
      </section>
    </div>
  );
}

export default App;
