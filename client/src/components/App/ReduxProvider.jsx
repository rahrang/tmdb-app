import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import inProduction from '../../utils/inProduction';
import reducer from '../../reducers';

const middleware = [thunk];
if (!inProduction) {
  const logger = createLogger({
    predicate: (getState, action) => typeof (action || {}).type !== 'undefined',
  });
  middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
