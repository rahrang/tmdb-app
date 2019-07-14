import React from 'react';
import { Router as ReachRouter } from '@reach/router';

import Main from '../Main/Main';
import Home from '../Home';

class Router extends React.Component {
  render() {
    return (
      <ReachRouter>
        <Main path="/">
          <Home path="/" />
        </Main>
      </ReachRouter>
    );
  }
}

export default Router;
