const axios = require('axios');

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  validateStatus: () => true,
  params: {},
});

tmdbClient.interceptors.request.use(config => ({
  ...config,
  params: {
    api_key: process.env.TMDB_API_KEY,
    ...config.params,
  },
}));

module.exports = tmdbClient;
