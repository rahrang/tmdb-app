const tmdbClient = require('../tmdbClient');

exports.searchMovies = async (req, res) => {
  const tmdbResponse = await tmdbClient.get('/search/movie', {
    params: {
      query: req.query.query,
      language: req.query.language,
      page: req.query.page,
      region: req.query.region,
      year: req.query.year,
      primary_release_year: req.query.primary_release_year,
      include_adult: req.query.include_adult,
    },
  });
  res.status(tmdbResponse.status).send(tmdbResponse.data);
};
