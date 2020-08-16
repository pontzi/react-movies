import { useContext } from "react";
import { MoviesContext } from "../../../context/MoviesProvider";
import {
  popular,
  kids,
  old,
  drama,
  fiction,
} from "../../../pages/helpers/categories";

const useCarouselLogic = () => {
  const { movies, myMoviesList, setToMyList } = useContext(MoviesContext);

  const assignCategory = (category) => {
    switch (category) {
      case popular:
        return movies.popular;
      case kids:
        return movies.drama;
      case old:
        return movies.old;
      case drama:
        return movies.fiction;
      case fiction:
        return movies.kids;
      default:
        break;
    }
  };

  const validation = (movieID) => {
    const entries = Object.entries(myMoviesList);

    const id = movieID.toString();

    const result = entries.filter((entry) => entry[0] === id);

    if (result.length > 0) {
      if (result[0][1] === undefined) {
        return undefined;
      }
      if (result[0][1]) {
        return true;
      }
    } else {
      return null;
    }
  };

  const addToMyList = (movieID) => {
    const result = validation(movieID);
    switch (result) {
      case undefined:
        setToMyList(movieID, undefined);
        break;
      case null:
        setToMyList(movieID, null);
        break;
      case true:
        setToMyList(movieID, true);
        break;
      default:
        break;
    }
  };
  return [addToMyList, assignCategory];
};
export default useCarouselLogic;
