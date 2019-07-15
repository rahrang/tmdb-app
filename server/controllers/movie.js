const tmdbClient = require('../tmdbClient');

const validMovieTypes = ['popular', 'now_playing', 'top_rated', 'upcoming'];

exports.validateMovieType = (req, res, next) => {
  if (validMovieTypes.some(movieType => movieType === req.params.type)) {
    next();
  } else {
    res.status(400).send({ error: 'received invalid configuration type' });
  }
};

exports.getMoviesByType = async (req, res) => {
  const tmdbResponse = await tmdbClient.get(`/movie/${req.params.type}`, {
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

exports.getMovieGenres = async (req, res) => {
  const tmdbResponse = await tmdbClient.get(`/genre/movie/list`, {
    params: {
      language: req.query.language,
    },
  });
  res.status(tmdbResponse.status).send(tmdbResponse.data);
};
