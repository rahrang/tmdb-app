const express = require('express');

const ctr = require('../controllers/configuration');

const router = express.Router();

router.get('/', ctr.getTMDBConfiguration);
router.get('/:configuration_type', ctr.validateConfigurationType, ctr.getConfigurationType);

module.exports = router;
