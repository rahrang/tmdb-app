const tmdbClient = require('../tmdbClient');

exports.getPopularMovies = async (req, res) => {
  const tmdbResponse = await tmdbClient.get('/movie/popular', {
    params: {
      language: req.query.language,
      page: req.query.page,
      region: req.query.region,
    },
  });
  res.status(tmdbResponse.status).send(tmdbResponse.data);
};

exports.getMovieByID = async (req, res) => {
  const tmdbResponse = await tmdbClient.get(`/movie/${req.params.movie_id}`, {
    params: {
      language: req.query.language,
      append_to_response: req.query.append_to_response,
    },
  });
  res.status(tmdbResponse.status).send(tmdbResponse.data);
};
