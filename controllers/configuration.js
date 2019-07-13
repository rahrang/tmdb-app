const tmdbClient = require('../tmdbClient');

const validConfigurationTypes = ['countries', 'languages', 'primary_translations', 'timezones'];

exports.getTMDBConfiguration = async (req, res) => {
  const tmdbResponse = await tmdbClient.get('/configuration', {
    params: {
      language: req.query.language,
      page: req.query.page,
      region: req.query.region,
    },
  });
  res.status(tmdbResponse.status).send(tmdbResponse.data);
};

exports.validateConfigurationType = (req, res, next) => {
  if (validConfigurationTypes.some(configurationType => configurationType === req.params.configuration_type)) {
    next();
  } else {
    res.status(400).send({ error: 'received invalid configuration type' });
  }
};

exports.getConfigurationType = async (req, res) => {
  const tmdbResponse = await tmdbClient.get(`/configuration/${req.params.configuration_type}`);
  res.status(tmdbResponse.status).send(tmdbResponse.data);
};
