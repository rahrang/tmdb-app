import _get from 'lodash.get';

import { movieTypes } from '../actions/movie';

const initialState = {
  moviesByType: {}, // [type] => [language] => [page] => { data, resolved, error }
  movie: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case movieTypes.GET_MOVIES_BY_TYPE_ATTEMPT:
      return {
        ...state,
        moviesByType: {
          ...state.moviesByType,
          [action.movieType]: {
            ..._get(state, `moviesByType.${action.movieType}`, {}),
            [action.language]: {
              ..._get(state, `moviesByType.${action.movieType}.${action.language}`, {}),
              [action.page]: {
                data: {},
                resolved: false,
                error: null,
              },
            },
          },
        },
      };
    case movieTypes.GET_MOVIES_BY_TYPE_SUCCESS:
      return {
        ...state,
        moviesByType: {
          ...state.moviesByType,
          [action.movieType]: {
            ..._get(state, `moviesByType.${action.movieType}`, {}),
            [action.language]: {
              ..._get(state, `moviesByType.${action.movieType}.${action.language}`, {}),
              [action.page]: {
                data: action.data,
                resolved: true,
                error: null,
              },
            },
          },
        },
      };
    case movieTypes.GET_MOVIES_BY_TYPE_FAILURE:
      return {
        ...state,
        moviesByType: {
          ...state.moviesByType,
          [action.movieType]: {
            ..._get(state, `moviesByType.${action.movieType}`, {}),
            [action.language]: {
              ..._get(state, `moviesByType.${action.movieType}.${action.language}`, {}),
              [action.page]: {
                data: {},
                resolved: true,
                error: action.error,
              },
            },
          },
        },
      };
    case movieTypes.GET_MOVIE_ATTEMPT:
      return {
        ...state,
        movie: {
          ...state.movie,
          [action.movieID]: {
            ...(state.movie[action.movieID] || {}),
            [action.language]: {
              data: {},
              resolved: false,
              error: null,
            },
          },
        },
      };
    case movieTypes.GET_MOVIE_SUCCESS:
      return {
        ...state,
        movie: {
          ...state.movie,
          [action.movieID]: {
            ...(state.movie[action.movieID] || {}),
            [action.language]: {
              data: action.data,
              resolved: true,
              error: null,
            },
          },
        },
      };
    case movieTypes.GET_MOVIE_FAILURE:
      return {
        ...state,
        movie: {
          ...state.movie,
          [action.movieID]: {
            ...(state.movie[action.movieID] || {}),
            [action.language]: {
              data: {},
              resolved: true,
              error: action.error,
            },
          },
        },
      };
    default:
      return state;
  }
};
