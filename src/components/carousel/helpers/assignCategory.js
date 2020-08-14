const assignCategory = (category, movies) => {
  switch (category) {
    case "popular":
      return movies.popular;
    case "drama":
      return movies.drama;
    case "old":
      return movies.old;
    case "fiction":
      return movies.fiction;
    case "kids":
      return movies.kids;
    default:
      break;
  }
};

export { assignCategory };
