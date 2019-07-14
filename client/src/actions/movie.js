import internalAPI from '../utils/internalAPI';

export const movieTypes = {
  GET_MOST_POPULAR_MOVIES_ATTEMPT: 'GET_MOST_POPULAR_MOVIES_ATTEMPT',
  GET_MOST_POPULAR_MOVIES_SUCCESS: 'GET_MOST_POPULAR_MOVIES_SUCCESS',
  GET_MOST_POPULAR_MOVIES_FAILURE: 'GET_MOST_POPULAR_MOVIES_FAILURE',
};

export const fetchPopularMovies = ({ page = 1, language }) => async dispatch => {
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
