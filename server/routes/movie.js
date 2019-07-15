const express = require('express');

const ctr = require('../controllers/movie');

const router = express.Router();

router.get('/type/:type', ctr.validateMovieType, ctr.getMoviesByType);
router.get('/genres', ctr.getMovieGenres);
router.get('/:movie_id', ctr.getMovieByID);

module.exports = router;
