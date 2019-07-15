import _get from 'lodash.get';
import _indexBy from 'lodash.indexby';

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
  const movieGenresPromise = internalAPI.get('/movie/genres');

  const [apiConfig, countriesConfig, languagesConfig, translationsConfig, movieGenres] = await Promise.all([
    apiConfigPromise,
    countriesConfigPromise,
    languagesConfigPromise,
    translationsConfigPromise,
    movieGenresPromise,
  ]);

  const didRequestFail = [apiConfig, countriesConfig, languagesConfig, translationsConfig, movieGenres].some(
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
      genres: _indexBy(movieGenres.data.genres, 'id'),
    },
  });
};

export default getAllConfigurations;
