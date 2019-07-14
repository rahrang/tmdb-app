import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash.get';

import { fetchPopularMovies } from '../../actions/movie';
import MovieRow from '../Movie/MovieRow';
import moviePreviewShape from '../Movie/proptypes';

class PopularMovies extends React.Component {
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
    return _get(popularMovies, `${language}.${page}`, {});
  };

  renderMovieRows = movies => {
    const { results } = movies;

    return (
      <table>
        <tbody>
          {results.map(r => (
            <MovieRow key={r.id} result={r} id={r.id} />
          ))}
        </tbody>
      </table>
    );
  };

  renderMovieCards = movies => {
    const { results } = movies;

    return (
      <table>
        <tbody>
          {results.map(r => (
            <MovieRow key={r.id} result={r} id={r.id} />
          ))}
        </tbody>
      </table>
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

    const { view } = this.props;

    if (view === 'table') {
      return this.renderMovieRows(movies.data);
    }

    return this.renderMovieCards(movies.data);
  }
}

const mapStateToProps = state => ({
  configuration: state.configuration,
  language: state.session.language,
  popularMovies: state.movie.popular,
});

const mapDispatchToProps = dispatch => ({
  getPopularMovies: opts => dispatch(fetchPopularMovies(opts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopularMovies);

PopularMovies.propTypes = {
  language: PropTypes.string.isRequired,
  getPopularMovies: PropTypes.func.isRequired,
  popularMovies: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.exact({
        data: PropTypes.shape({
          page: PropTypes.number,
          total_results: PropTypes.number,
          total_pages: PropTypes.number,
          results: PropTypes.arrayOf(moviePreviewShape),
        }),
        resolved: PropTypes.bool,
        error: PropTypes.string,
      }),
    ),
  ),
  view: PropTypes.oneOf(['table', 'grid']).isRequired,
};
