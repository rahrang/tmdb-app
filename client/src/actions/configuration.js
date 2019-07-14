import _get from 'lodash.get';

import internalAPI from '../utils/internalAPI';

export const configurationTypes = {
  GET_CONFIGURATIONS_ATTEMPT: 'GET_CONFIGURATIONS_ATTEMPT',
  GET_CONFIGURATIONS_SUCCESS: 'GET_CONFIGURATIONS_SUCCESS',
  GET_CONFIGURATIONS_FAILURE: 'GET_CONFIGURATIONS_FAILURE',
};

const getAllConfigurations = () => async (dispatch, getState) => {
  const state = _get(getState(), 'configuration', {});
  if (state.resolved && !state.error) {
    return;
  }

  dispatch({
    type: configurationTypes.GET_CONFIGURATIONS_ATTEMPT,
  });

  const apiConfigPromise = internalAPI.get('/configuration/');
  const countriesConfigPromise = internalAPI.get('/configuration/countries');
  const languagesConfigPromise = internalAPI.get('/configuration/languages');
  const translationsConfigPromise = internalAPI.get('/configuration/primary_translations');

  const [apiConfig, countriesConfig, languagesConfig, translationsConfig] = await Promise.all([
    apiConfigPromise,
    countriesConfigPromise,
    languagesConfigPromise,
    translationsConfigPromise,
  ]);

  const didRequestFail = [apiConfig, countriesConfig, languagesConfig, translationsConfig].some(
    res => res.status !== 200,
  );
  if (didRequestFail) {
    dispatch({
      type: configurationTypes.GET_CONFIGURATIONS_FAILURE,
    });
  }

  dispatch({
    type: configurationTypes.GET_CONFIGURATIONS_SUCCESS,
    data: {
      api: apiConfig.data,
      countries: countriesConfig.data,
      languages: languagesConfig.data,
      translations: translationsConfig.data,
    },
  });
};

export default getAllConfigurations;
