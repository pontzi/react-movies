import React, { useContext, useEffect } from "react";
import { MoviesContext } from "../context/MoviesProvider";
import { motion } from "framer-motion";
import Carousel from "../components/carousel/Carousel";
import Video from "../components/MainVideo/Video";
import Search from "../components/Search/Search";
import {
  popularMovies,
  kidsMovies,
  oldMovies,
  dramaClassics,
  scienceFiction,
} from "./helpers/categories";

const Home = () => {
  const { setQueryValue } = useContext(MoviesContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => setQueryValue(null, "");
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
      <Search />
      <Carousel
        categoryKey={"popular"}
        category={popularMovies}
        title="Popular Movies"
      />
      <Carousel
        categoryKey={"kids"}
        category={kidsMovies}
        title="Kids Movies"
      />
      <Carousel categoryKey={"old"} category={oldMovies} title="Old Movies" />
      <Carousel
        categoryKey={"drama"}
        category={dramaClassics}
        title="Drama Classics"
      />
      <Carousel
        categoryKey={"fiction"}
        category={scienceFiction}
        title="Science Fiction"
      />
    </motion.div>
  );
};

export default Home;
