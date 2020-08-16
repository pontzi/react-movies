import { useContext, useEffect } from "react";
import swal from "sweetalert";
import { MoviesContext } from "../../../context/MoviesProvider";

const useMoviesValidation = () => {
  const { myMoviesList, setToMyList, movies } = useContext(MoviesContext);
  const { allMovies } = movies;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let moviesWithoutRepeating = [];

  if (!allMovies) {
    return false;
  }

  const moviesValues = Object.values(myMoviesList);
  const newMoviesList = moviesValues.filter((movie) => movie !== undefined);
  const filteredMovies = allMovies.filter((movie) =>
    newMoviesList.includes(movie.id)
  );

  moviesWithoutRepeating = filteredMovies.filter(
    (currentMovie, currentIndex, array) => {
      return (
        array.findIndex(
          (arrayElement) =>
            JSON.stringify(arrayElement) === JSON.stringify(currentMovie)
        ) === currentIndex
      );
    }
  );

  const onHandleDelete = (movieID) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it will disappear from your favorites list",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setToMyList(movieID, true);
      } else {
        swal("Your movie is safe! ☺");
      }
    });
  };
  return { moviesWithoutRepeating, onHandleDelete };
};

export default useMoviesValidation;
