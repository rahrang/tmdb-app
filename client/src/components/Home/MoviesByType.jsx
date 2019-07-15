import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import numbro from 'numbro';

import { fetchMoviesByType } from '../../actions/movie';
import MovieCard from '../Movie/MovieCard';
import moviePreviewShape from '../Movie/proptypes';
import { PageLoader } from '../common/Loader';
import Paginator from '../common/Paginator';
import movieTypes from './movieTypes';
import MovieType from './MovieType';

class MoviesByType extends React.Component {
  state = {
    page: 1,
    type: movieTypes[0].type,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { language: prevLanguage } = prevProps;
    const { language } = this.props;
    const { page: prevPage, type: prevType } = prevState;
    const { page, type } = this.state;
    if (page !== prevPage || language !== prevLanguage || type !== prevType) {
      this.getMovies();
    }
  }

  onChangeMovieType = newType => {
    const { type } = this.state;
    if (newType !== type) {
      this.setState({ type: newType, page: 1 });
    }
  };

  onChangePage = newPage => {
    const { page } = this.state;
    if (newPage !== page) {
      this.setState({ page: newPage });
    }
  };

  getMovies = () => {
    const { getMoviesByType, language } = this.props;
    const { page, type } = this.state;
    getMoviesByType({ movieType: type, page, language });
  };

  getMoviesObj = () => {
    const { moviesByType, language } = this.props;
    const { page, type } = this.state;
    return _get(moviesByType, `${type}.${language}.${page}`, {});
  };

  renderMovieTypes = () => {
    const { type: activeType } = this.state;
    return (
      <div className="m-t-1">
        {movieTypes.map(({ type, display }) => (
          <MovieType key={type} type="button" onClick={() => this.onChangeMovieType(type)} active={type === activeType}>
            {display}
          </MovieType>
        ))}
      </div>
    );
  };

  renderMovieCards = movies => {
    const {
      configuration: { genres: genreMap },
    } = this.props;
    const { page } = this.state;
    const { results, total_results, total_pages } = movies;

    return (
      <div className="m-t-1">
        <div className="text-right">{`${numbro(total_results).format({ thousandSeparated: true })} Results Total`}</div>
        <div className="flex-row flex-wrap content-center m-b-1">
          {results.map(r => {
            const genres = r.genre_ids.map(id => genreMap[id]);
            return <MovieCard key={r.id} result={r} id={r.id} genres={genres} />;
          })}
        </div>
        <Paginator changePage={this.onChangePage} currentPage={page} lastPage={total_pages} />
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderMovieTypes()}
        {(() => {
          const movies = this.getMoviesObj();
          if (!movies.resolved) {
            return <PageLoader />;
          }

          if (movies.error) {
            return <div>Failed.</div>;
          }

          return this.renderMovieCards(movies.data);
        })()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  configuration: state.configuration.data,
  language: state.session.language,
  moviesByType: state.movie.moviesByType,
});

const mapDispatchToProps = dispatch => ({
  getMoviesByType: opts => dispatch(fetchMoviesByType(opts)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesByType);

MoviesByType.propTypes = {
  language: PropTypes.string.isRequired,
  getMoviesByType: PropTypes.func.isRequired,
  moviesByType: PropTypes.objectOf(
    PropTypes.objectOf(
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
  ),
};
