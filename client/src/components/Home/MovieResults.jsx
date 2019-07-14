import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash.get';

import { searchMovies } from '../../actions/search';
import moviePreviewShape from '../Movie/proptypes';
import MovieRow from '../Movie/MovieRow';

class MovieResults extends React.Component {
  state = {
    page: 1,
  };

  componentDidMount() {
    const { query, language } = this.props;
    const { page } = this.state;
    this.search({ query, language, page });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, language: prevLanguage } = prevProps;
    const { query, language } = this.props;
    const { page: prevPage } = prevState;
    const { page } = this.state;
    if (query !== prevQuery || language !== prevLanguage || page !== prevPage) {
      this.search({ query, language, page });
    }
  }

  search = opts => {
    const { search } = this.props;
    search(opts);
  };

  getSearchResults = () => {
    const { searchResults, language } = this.props;
    const { page } = this.state;
    return _get(searchResults, `${language}.${page}`, {});
  };

  renderMovieRows = movieResults => {
    const { results } = movieResults;

    if (results.length === 0) {
      return (
        <div>
          <h3>No results for this query</h3>
        </div>
      );
    }

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
    const searchResults = this.getSearchResults();

    if (!searchResults.resolved) {
      return <div>Loading...</div>;
    }

    if (searchResults.error) {
      return <div>Failed.</div>;
    }

    const { view } = this.props;

    if (view === 'table') {
      return this.renderMovieRows(searchResults.data);
    }

    return this.renderMovieCards(searchResults.data);
  }
}

const mapStateToProps = (state, props) => ({
  language: state.session.language,
  searchResults: state.search.movies[props.query] || {},
});

const mapDispatchToProps = dispatch => ({
  search: opts => dispatch(searchMovies(opts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieResults);

MovieResults.propTypes = {
  language: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  searchResults: PropTypes.objectOf(
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
