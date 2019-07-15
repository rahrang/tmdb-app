import _get from 'lodash.get';
import wait from 'waait';

import internalAPI from '../utils/internalAPI';

export const movieTypes = {
  GET_MOVIES_BY_TYPE_ATTEMPT: 'GET_MOVIES_BY_TYPE_ATTEMPT',
  GET_MOVIES_BY_TYPE_SUCCESS: 'GET_MOVIES_BY_TYPE_SUCCESS',
  GET_MOVIES_BY_TYPE_FAILURE: 'GET_MOVIES_BY_TYPE_FAILURE',
  GET_MOVIE_ATTEMPT: 'GET_MOVIE_ATTEMPT',
  GET_MOVIE_SUCCESS: 'GET_MOVIE_SUCCESS',
  GET_MOVIE_FAILURE: 'GET_MOVIE_FAILURE',
};

export const fetchMoviesByType = ({ movieType, page = 1, language }) => async (dispatch, getState) => {
  const state = _get(getState(), `movie.moviesByType.${movieType}.${language}.${page}`, {});
  if (state.resolved && !state.error) {
    return;
  }

  dispatch({
    type: movieTypes.GET_MOVIES_BY_TYPE_ATTEMPT,
    movieType,
    language,
    page,
  });

  const res = await internalAPI.get(`/movie/type/${movieType}`, {
    params: {
      language,
      page,
    },
  });

  await wait(1500);

  if (res.status === 200) {
    dispatch({
      type: movieTypes.GET_MOVIES_BY_TYPE_SUCCESS,
      data: res.data,
      movieType,
      language,
      page,
    });
  } else {
    dispatch({
      type: movieTypes.GET_MOVIES_BY_TYPE_FAILURE,
      movieType,
      language,
      page,
    });
  }
};

export const fetchMovieByID = ({ movieID, language }) => async (dispatch, getState) => {
  const state = _get(getState(), `movie.${movieID}.${language}`, {});
  if (state.resolved && !state.error) {
    return;
  }

  dispatch({
    type: movieTypes.GET_MOVIE_ATTEMPT,
    movieID,
    language,
  });

  const res = await internalAPI.get(`/movie/${movieID}`, {
    params: {
      append_to_response: 'credits,external_ids',
    },
  });

  await wait(1500);

  if (res.status === 200) {
    dispatch({
      type: movieTypes.GET_MOVIE_SUCCESS,
      data: res.data,
      movieID,
      language,
    });
  } else {
    dispatch({
      type: movieTypes.GET_MOVIE_FAILURE,
      movieID,
      language,
    });
  }
};
