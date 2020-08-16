import { useContext } from "react";
import { MoviesContext } from "../../../context/MoviesProvider";

const useSearchFilter = (props) => {
  const { movies, myMoviesList, setToMyList } = useContext(MoviesContext);
  const { allMovies } = movies;
  let moviesData = undefined;

  const currentQuery = props.match.params.searchName;

  let moviesWithoutRepeating = [];

  if (!allMovies) {
    return false;
  }

  if (currentQuery) {
    moviesData = allMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(currentQuery.toLowerCase());
    });
    if (moviesData.length === 0) {
      return false;
    }
    moviesWithoutRepeating = moviesData.filter(
      (currentMovie, currentIndex, array) => {
        return (
          array.findIndex(
            (arrayElement) =>
              JSON.stringify(arrayElement) === JSON.stringify(currentMovie)
          ) === currentIndex
        );
      }
    );
  }
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

  return { moviesWithoutRepeating, addToMyList, myMoviesList };
};

export default useSearchFilter;
