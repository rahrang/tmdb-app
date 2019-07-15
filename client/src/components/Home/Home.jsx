import React from 'react';

import MoviesByType from './MoviesByType';
import MovieResults from './MovieResults';
import HomeStyles from './HomeStyles';

class Home extends React.Component {
  state = {
    query: '',
  };

  onQueryChange = event => {
    const {
      target: { value },
    } = event;
    this.setState({ query: value });
  };

  renderMovies = () => {
    const { query } = this.state;
    if (query.length === 0) {
      return <MoviesByType />;
    }

    return <MovieResults query={query} />;
  };

  render() {
    const { query } = this.state;
    return (
      <HomeStyles>
        <div className="search-input flex-row flex-center">
          <input
            name="search"
            type="text"
            value={query}
            onChange={this.onQueryChange}
            placeholder="Search for movie titles"
          />
        </div>
        {this.renderMovies()}
      </HomeStyles>
    );
  }
}

export default Home;
