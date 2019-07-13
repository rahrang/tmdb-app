const express = require('express');

const ctr = require('../controllers/search');

const router = express.Router();

router.get('/movie', ctr.searchMovies);

module.exports = router;
