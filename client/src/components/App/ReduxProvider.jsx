import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import inProduction from '../../utils/inProduction';
import reducer from '../../reducers';

const middleware = inProduction ? [thunk] : [logger, thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

export default ReduxProvider;
