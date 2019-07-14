import React from 'react';

import PopularMovies from './PopularMovies';
import MovieResults from './MovieResults';

class Home extends React.Component {
  state = {
    query: '',
    view: 'table',
  };

  setView = newView => {
    const { view } = this.state;
    if (newView !== view) {
      this.setState({ view: newView });
    }
  };

  renderViewChanger = () => (
    <div>
      <button type="button" onClick={() => this.setView('table')}>
        Table
      </button>
      <button type="button" onClick={() => this.setView('grid')}>
        Grid
      </button>
    </div>
  );

  onQueryChange = event => {
    const {
      target: { value },
    } = event;
    this.setState({ query: value });
  };

  renderMoviesTable = () => (
    <table>
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      {this.renderMovies()}
    </table>
  );

  renderMovies = () => {
    const { query, view } = this.state;
    if (query.length === 0) {
      return <PopularMovies view={view} />;
    }

    return <MovieResults query={query} view={view} />;
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <input name="search" value={query} onChange={this.onQueryChange} />
        {this.renderViewChanger()}
        {this.renderMovies()}
      </div>
    );
  }
}

export default Home;
