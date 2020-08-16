import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Carousel from "../../components/carousel/Carousel";
import Video from "../../components/MainVideo/Video";
import { pageVariant } from "../helpers/pageVariants";
import {
  popularMovies,
  kidsMovies,
  oldMovies,
  dramaClassics,
  scienceFiction,
  popular,
  kids,
  old,
  drama,
  fiction,
  popularTitle,
  kidsTitle,
  oldTitle,
  dramaTitle,
  fictionTitle,
} from "../helpers/categories";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial="out" animate="in" exit="out" variants={pageVariant}>
      <Video />
      <Carousel
        categoryKey={popular}
        category={popularMovies}
        title={popularTitle}
      />
      <Carousel categoryKey={kids} category={kidsMovies} title={kidsTitle} />
      <Carousel categoryKey={old} category={oldMovies} title={oldTitle} />
      <Carousel
        categoryKey={drama}
        category={dramaClassics}
        title={dramaTitle}
      />
      <Carousel
        categoryKey={fiction}
        category={scienceFiction}
        title={fictionTitle}
      />
    </motion.div>
  );
};

export default Home;
