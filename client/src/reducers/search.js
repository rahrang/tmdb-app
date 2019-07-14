import _get from 'lodash.get';

import { searchTypes } from '../actions/search';

const initialState = {
  movies: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchTypes.SEARCH_MOVIES_ATTEMPT:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.query]: {
            ..._get(state, `movies.${action.query}`, {}),
            [action.language]: {
              ..._get(state, `movies.${action.query}.${action.language}`, {}),
              [action.page]: {
                data: {},
                resolved: false,
                error: null,
              },
            },
          },
        },
      };
    case searchTypes.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.query]: {
            ..._get(state, `movies.${action.query}`, {}),
            [action.language]: {
              ..._get(state, `movies.${action.query}.${action.language}`, {}),
              [action.page]: {
                data: action.data,
                resolved: true,
                error: null,
              },
            },
          },
        },
      };
    case searchTypes.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.query]: {
            ..._get(state, `movies.${action.query}`, {}),
            [action.language]: {
              ..._get(state, `movies.${action.query}.${action.language}`, {}),
              [action.page]: {
                data: {},
                resolved: true,
                error: action.error,
              },
            },
          },
        },
      };
    default:
      return state;
  }
};
