import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import formatDate from 'date-fns/format';

import { fetchMovieByID } from '../../actions/movie';
import MoviePageStyles from './MoviePageStyles';
import { PageLoader } from '../common/Loader';
import baseImageURL from '../../utils/baseImageURL';

class MoviePage extends React.Component {
  componentDidMount() {
    const { getMovie, language } = this.props;
    getMovie(language);
  }

  componentDidUpdate(prevProps) {
    const { movieID: prevMovieID } = prevProps;
    const { movieID } = this.props;
    if (movieID !== prevMovieID) {
      const { getMovie, language } = this.props;
      getMovie(language);
    }
  }

  getMovieObj = () => {
    const { movie, language } = this.props;
    return _get(movie, `${language}`, {});
  };

  renderMoviePage = movie => {
    return (
      <MoviePageStyles>
        <div className="header flex-row items-baseline m-b-2">
          <h1 className="m-b-h">{movie.title}</h1>
          {movie.homepage && (
            <a className="m-l-1" href={movie.homepage} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt"></i>
            </a>
          )}
        </div>
        <div className="flex-row">
          <img className="poster" src={`${baseImageURL}/w500/${movie.poster_path}`} alt="" />
          <div className="flex-col m-h-1">
            <p>{movie.overview}</p>
            <p>{`Released: ${formatDate(movie.release_date, 'MMMM Do YYYY')}`}</p>
          </div>
        </div>
        <pre>{JSON.stringify(movie, null, 2)}</pre>
      </MoviePageStyles>
    );
  };

  render() {
    const movie = this.getMovieObj();

    if (!movie.resolved) {
      return <PageLoader />;
    }

    if (movie.error) {
      return <div>Failed.</div>;
    }

    return this.renderMoviePage(movie.data);
  }
}

const mapStateToProps = (state, props) => ({
  language: state.session.language,
  movie: state.movie.movie[props.movie_id] || {},
  movieID: props.movie_id,
});

const mapDispatchToProps = (dispatch, props) => ({
  getMovie: language => dispatch(fetchMovieByID({ movieID: props.movie_id, language })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviePage);

MoviePage.propTypes = {
  language: PropTypes.string.isRequired,
  movieID: PropTypes.string.isRequired,
  getMovie: PropTypes.func.isRequired,
  movie: PropTypes.objectOf(
    PropTypes.exact({
      data: PropTypes.exact({
        adult: PropTypes.bool,
        backdrop_path: PropTypes.string,
        belongs_to_collection: {
          id: PropTypes.number,
          name: PropTypes.string,
          poster_path: PropTypes.string,
          backdrop_path: PropTypes.string,
        },
        budget: PropTypes.number,
        genres: PropTypes.arrayOf(
          PropTypes.exact({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        ),
        homepage: PropTypes.string,
        id: PropTypes.number,
        imdb_id: PropTypes.string,
        original_language: PropTypes.string,
        original_title: PropTypes.string,
        overview: PropTypes.string,
        popularity: PropTypes.number,
        poster_path: PropTypes.string,
        production_companies: PropTypes.arrayOf(
          PropTypes.exact({
            id: PropTypes.number,
            logo_path: PropTypes.string,
            name: PropTypes.string,
            origin_country: PropTypes.string,
          }),
        ),
        production_countries: PropTypes.arrayOf(
          PropTypes.exact({
            iso_3166_1: PropTypes.string,
            name: PropTypes.string,
          }),
        ),
        release_date: PropTypes.string,
        revenue: PropTypes.number,
        runtime: PropTypes.number,
        spoken_languages: PropTypes.arrayOf(
          PropTypes.exact({
            iso_3166_1: PropTypes.string,
            name: PropTypes.string,
          }),
        ),
        status: PropTypes.string,
        tagline: PropTypes.string,
        title: PropTypes.string,
        video: PropTypes.bool,
        videos: PropTypes.shape({
          results: PropTypes.arrayOf(
            PropTypes.exact({
              id: PropTypes.string,
              iso_639_1: PropTypes.string,
              iso_3166_1: PropTypes.string,
              key: PropTypes.string,
              name: PropTypes.string,
              site: PropTypes.string,
              size: PropTypes.number,
              type: PropTypes.string,
            }),
          ),
        }),
        vote_average: PropTypes.number,
        vote_count: PropTypes.number,
      }),
      resolved: PropTypes.bool,
      error: PropTypes.string,
    }),
  ).isRequired,
};
