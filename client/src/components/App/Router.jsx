import React from 'react';
import { Router as ReachRouter } from '@reach/router';

import Main from '../Main/Main';
import Home from '../Home/Home';
import MoviePage from '../Movie/MoviePage';
import NotFound from '../NotFound';

class Router extends React.Component {
  render() {
    return (
      <ReachRouter>
        <Main path="/">
          <Home path="/" />
          <MoviePage path="/movie/:movie_id" />
          <NotFound default />
        </Main>
      </ReachRouter>
    );
  }
}

export default Router;
