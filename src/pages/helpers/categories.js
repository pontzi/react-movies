const popularMovies = "/discover/movie?sort_by=popularity.desc";
const kidsMovies =
  "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";
const oldMovies =
  "/discover/movie?primary_release_year=2010&sort_by=vote_average.desc";
const dramaClassics =
  "/discover/movie?with_genres=18&primary_release_year=2014";
const scienceFiction =
  "/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc";

export { popularMovies, kidsMovies, oldMovies, dramaClassics, scienceFiction };
