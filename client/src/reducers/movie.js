import { movieTypes } from '../actions/movie';

const initialState = {
  popular: {}, // [language] => [page] => { data, resolved, error }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case movieTypes.GET_MOST_POPULAR_MOVIES_ATTEMPT:
      return {
        ...state,
        popular: {
          ...state.popular,
          [action.language]: {
            [action.page]: {
              data: {},
              resolved: false,
              error: null,
            },
          },
        },
      };
    case movieTypes.GET_MOST_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popular: {
          ...state.popular,
          [action.language]: {
            [action.page]: {
              data: action.data,
              resolved: true,
              error: null,
            },
          },
        },
      };
    case movieTypes.GET_MOST_POPULAR_MOVIES_FAILURE:
      return {
        ...state,
        popular: {
          ...state.popular,
          [action.language]: {
            [action.page]: {
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
