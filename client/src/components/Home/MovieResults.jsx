import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import _debounce from 'lodash.debounce';
import numbro from 'numbro';

import { searchMovies } from '../../actions/search';
import moviePreviewShape from '../Movie/proptypes';
import MovieRow from '../Movie/MovieRow';
import { PageLoader } from '../common/Loader';
import Paginator from '../common/Paginator';

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

  search = _debounce(opts => {
    const { search } = this.props;
    search(opts);
  }, 500);

  onChangePage = newPage => {
    const { page } = this.state;
    if (newPage !== page) {
      this.setState({ page: newPage });
    }
  };

  getSearchResults = () => {
    const { searchResults, language } = this.props;
    const { page } = this.state;
    return _get(searchResults, `${language}.${page}`, {});
  };

  renderMovieRows = movieResults => {
    const {
      configuration: { genres: genreMap },
    } = this.props;
    const { page } = this.state;
    const { results, total_results, total_pages } = movieResults;

    if (total_results === 0) {
      return (
        <div>
          <h3>No results for this query</h3>
        </div>
      );
    }

    return (
      <div className="m-t-1">
        <div className="text-right">{`${numbro(total_results).format({ thousandSeparated: true })} Results Total`}</div>
        <div className="flex-row flex-wrap content-center m-b-1">
          {results.map(r => {
            const genres = r.genre_ids.map(id => genreMap[id]);
            return <MovieRow key={r.id} result={r} id={r.id} genres={genres} />;
          })}
        </div>
        <Paginator changePage={this.onChangePage} currentPage={page} lastPage={total_pages} />
      </div>
    );
  };

  render() {
    const searchResults = this.getSearchResults();

    if (!searchResults.resolved) {
      return <PageLoader />;
    }

    if (searchResults.error) {
      return <div>Failed.</div>;
    }

    return <div>{this.renderMovieRows(searchResults.data)}</div>;
  }
}

const mapStateToProps = (state, props) => ({
  configuration: state.configuration.data,
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
};
