const express = require('express');

const ctr = require('../controllers/movie');

const router = express.Router();

router.get('/popular', ctr.getPopularMovies);
router.get('/:movie_id', ctr.getMovieByID);

module.exports = router;
