import React from "react";
import Carousel from "../components/carousel/Carousel";
import {
  popularMovies,
  kidsMovies,
  oldMovies,
  dramaClassics,
  scienceFiction,
} from "./helpers/categories";
const Home = () => {
  return (
    <div>
      <Carousel category={popularMovies} title="Popular Movies" />
      <Carousel category={kidsMovies} title="Kids Movies" />
      <Carousel category={oldMovies} title="Old Movies" />
      <Carousel category={dramaClassics} title="Drama Classics" />
      <Carousel category={scienceFiction} title="Science Fiction" />
    </div>
  );
};

export default Home;
