const express = require('express');

const movieRoutes = require('./movie');
const searchRoutes = require('./search');
const configurationRoutes = require('./configuration');

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.status(200).send({
    ok: true,
    status: 200,
  });
});

router.use('/movie', movieRoutes);
router.use('/search', searchRoutes);
router.use('/configuration', configurationRoutes);

module.exports = router;
