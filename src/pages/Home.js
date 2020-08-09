import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Carousel from "../components/carousel/Carousel";
import Video from "../components/MainVideo/Video";
import {
  popularMovies,
  kidsMovies,
  oldMovies,
  dramaClassics,
  scienceFiction,
} from "./helpers/categories";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const pageVariant = {
    in: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    out: {
      opacity: 0,
      x: "-100vw",
      y: 0,
    },
  };

  const pageTransition = {};
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageVariant}
      transition={pageTransition}
    >
      <Video />
      <Carousel category={popularMovies} title="Popular Movies" />
      <Carousel category={kidsMovies} title="Kids Movies" />
      <Carousel category={oldMovies} title="Old Movies" />
      <Carousel category={dramaClassics} title="Drama Classics" />
      <Carousel category={scienceFiction} title="Science Fiction" />
    </motion.div>
  );
};

export default Home;
