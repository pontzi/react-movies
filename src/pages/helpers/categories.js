const popularMovies = "/discover/movie?sort_by=popularity.desc";
const kidsMovies =
  "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc";
const oldMovies =
  "/discover/movie?primary_release_year=2010&sort_by=vote_average.desc";
const dramaClassics =
  "/discover/movie?with_genres=18&primary_release_year=2014";
const scienceFiction =
  "/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc";

const popular = "popular";
const kids = "kids";
const drama = "drama";
const fiction = "fiction";
const old = "old";

const popularTitle = "Popular Movies";
const kidsTitle = "Kids Movies";
const oldTitle = "Old Movies";
const dramaTitle = "Drama Classics";
const fictionTitle = "Science Fiction";

export {
  popularMovies,
  kidsMovies,
  oldMovies,
  dramaClassics,
  scienceFiction,
  popular,
  kids,
  drama,
  fiction,
  old,
  popularTitle,
  kidsTitle,
  oldTitle,
  dramaTitle,
  fictionTitle,
};
