import _get from 'lodash.get';

import internalAPI from '../utils/internalAPI';

export const movieTypes = {
  GET_MOST_POPULAR_MOVIES_ATTEMPT: 'GET_MOST_POPULAR_MOVIES_ATTEMPT',
  GET_MOST_POPULAR_MOVIES_SUCCESS: 'GET_MOST_POPULAR_MOVIES_SUCCESS',
  GET_MOST_POPULAR_MOVIES_FAILURE: 'GET_MOST_POPULAR_MOVIES_FAILURE',
  GET_MOVIE_ATTEMPT: 'GET_MOVIE_ATTEMPT',
  GET_MOVIE_SUCCESS: 'GET_MOVIE_SUCCESS',
  GET_MOVIE_FAILURE: 'GET_MOVIE_FAILURE',
};

export const fetchPopularMovies = ({ page = 1, language }) => async (dispatch, getState) => {
  const state = _get(getState(), `movie.popular.${language}.${page}`, {});
  if (state.resolved && !state.error) {
    return;
  }

  dispatch({
    type: movieTypes.GET_MOST_POPULAR_MOVIES_ATTEMPT,
    language,
    page,
  });

  const res = await internalAPI.get('/movie/popular', {
    params: {
      language,
      page,
    },
  });

  if (res.status === 200) {
    dispatch({
      type: movieTypes.GET_MOST_POPULAR_MOVIES_SUCCESS,
      data: res.data,
      language,
      page,
    });
  } else {
    dispatch({
      type: movieTypes.GET_MOST_POPULAR_MOVIES_FAILURE,
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
      append_to_response: 'videos',
    },
  });

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
