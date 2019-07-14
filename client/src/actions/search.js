import _get from 'lodash.get';

import internalAPI from '../utils/internalAPI';

export const searchTypes = {
  SEARCH_MOVIES_ATTEMPT: 'SEARCH_MOVIES_ATTEMPT',
  SEARCH_MOVIES_SUCCESS: 'SEARCH_MOVIES_SUCCESS',
  SEARCH_MOVIES_FAILURE: 'SEARCH_MOVIES_FAILURE',
};

export const searchMovies = ({ query, page, language }) => async (dispatch, getState) => {
  const state = _get(getState(), `search.movies.${query}.${language}.${page}`, {});
  if (state.resolved && !state.error) {
    return;
  }

  dispatch({
    type: searchTypes.SEARCH_MOVIES_ATTEMPT,
    query,
    page,
    language,
  });

  const res = await internalAPI.get('/search/movie', {
    params: {
      query,
      page,
      language,
    },
  });

  if (res.status === 200) {
    dispatch({
      type: searchTypes.SEARCH_MOVIES_SUCCESS,
      data: res.data,
      query,
      page,
      language,
    });
  } else {
    dispatch({
      type: searchTypes.SEARCH_MOVIES_FAILURE,
      error: res.data,
      query,
      page,
      language,
    });
  }
};
