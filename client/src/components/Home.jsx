import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPopularMovies } from '../actions/movie';

class Home extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { language: prevLanguage } = prevProps;
    const { language } = this.props;
    const { page: prevPage } = prevState;
    const { page } = this.state;
    if (page !== prevPage || language !== prevLanguage) {
      this.getMovies();
    }
  }

  getMovies = () => {
    const { getPopularMovies, language } = this.props;
    const { page } = this.state;
    getPopularMovies({ page, language });
  };

  getMoviesObj = () => {
    const { popularMovies, language } = this.props;
    const { page } = this.state;
    const movies = (popularMovies[language] || {})[page] || {};
    return movies;
  };

  renderMovies = movies => {
    const { results } = movies;

    return (
      <div>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    );
  };

  render() {
    const movies = this.getMoviesObj();

    if (!movies.resolved) {
      return <div>Loading...</div>;
    }

    if (movies.error) {
      return <div>Failed.</div>;
    }

    return this.renderMovies(movies.data);
  }
}

const mapStateToProps = state => ({
  language: state.session.language,
  popularMovies: state.movie.popular,
});

const mapDispatchToProps = dispatch => ({
  getPopularMovies: opts => dispatch(fetchPopularMovies(opts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

Home.propTypes = {
  language: PropTypes.string.isRequired,
  getPopularMovies: PropTypes.func.isRequired,
  popularMovies: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.exact({
        data: PropTypes.shape({
          page: PropTypes.number,
          total_results: PropTypes.number,
          total_pages: PropTypes.number,
          results: PropTypes.arrayOf(
            PropTypes.exact({
              vote_count: PropTypes.number,
              id: PropTypes.number,
              video: PropTypes.bool,
              vote_average: PropTypes.number,
              title: PropTypes.string,
              popularity: PropTypes.number,
              poster_path: PropTypes.string,
              original_language: PropTypes.string,
              original_title: PropTypes.string,
              genre_ids: PropTypes.arrayOf(PropTypes.number),
              backdrop_path: PropTypes.string,
              adult: PropTypes.bool,
              overview: PropTypes.string,
              release_date: PropTypes.string,
            }),
          ),
        }),
        resolved: PropTypes.bool,
        error: PropTypes.string,
      }),
    ),
  ),
};
