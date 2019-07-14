import { configurationTypes } from '../actions/configuration';

const initialState = {
  data: {},
  resolved: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case configurationTypes.GET_CONFIGURATIONS_SUCCESS:
      return {
        data: action.data,
        resolved: true,
        error: null,
      };
    case configurationTypes.GET_CONFIGURATIONS_FAILURE:
      return {
        data: {},
        resolved: true,
        error: action.error,
      };
    case configurationTypes.GET_CONFIGURATIONS_ATTEMPT:
    default:
      return state;
  }
};
