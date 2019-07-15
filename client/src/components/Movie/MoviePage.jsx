import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash.get';
import formatDate from 'date-fns/format';
import { Link } from '@reach/router';

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

  static renderHeader = movie => (
    <div className="header flex-row items-baseline m-b-2">
      <Link className="back" to="/">
        <i className="fa fa-chevron-left m-r-1"></i>
      </Link>
      <h1 className="m-b-h">{movie.title}</h1>
      {movie.homepage && (
        <a className="m-l-1" href={movie.homepage} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-external-link-alt"></i>
        </a>
      )}
    </div>
  );

  static renderProductionCompanies = movie =>
    movie.production_companies.length > 0 && (
      <div className="flex-col">
        <h4>Production Companies</h4>
        <div className="flex-row">
          {movie.production_companies.map(pc => (
            <div key={pc.id} className="company flex-col content-center m-r-1">
              <img src={`${baseImageURL}/w92${pc.logo_path}`} alt={pc.name} />
            </div>
          ))}
        </div>
      </div>
    );

  static renderGenres = movie =>
    movie.genres.length > 0 && (
      <div className="flex-col">
        <h4>Genres</h4>
        <div className="flex-row flex-wrap">
          {movie.genres.map(genre => (
            <span key={genre.id} className="m-r-1">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    );

  static renderCast = movie =>
    _get(movie, 'credits.cast', []).length > 0 && (
      <React.Fragment>
        <h4>Cast</h4>
        <table>
          <thead>
            <tr>
              <th />
              <th />
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movie.credits.cast.slice(0, 15).map(member => (
              <tr key={member.id}>
                <td>{member.profile_path && <img src={`${baseImageURL}/w45${member.profile_path}`} alt="" />}</td>
                <td>
                  <div className="m-l-1">{member.name}</div>
                </td>
                <td>
                  <div className="m-l-2">...</div>
                </td>
                <td>
                  <div className="m-l-2">{member.character}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );

  renderMoviePage = movie => {
    return (
      <MoviePageStyles>
        {MoviePage.renderHeader(movie)}
        <div className="flex-row">
          <img className="poster" src={`${baseImageURL}/w500/${movie.poster_path}`} alt="" />
          <div className="flex-col m-h-1">
            <p>{movie.overview}</p>
            <p>{`Release Date: ${formatDate(movie.release_date, 'MMMM Do, YYYY')}`}</p>
            {MoviePage.renderGenres(movie)}
            {MoviePage.renderProductionCompanies(movie)}
            {MoviePage.renderSocialMediaLinks(movie)}
          </div>
        </div>
        <div className="flex-col">{MoviePage.renderCast(movie)}</div>
      </MoviePageStyles>
    );
  };

  static SocialMediaLink = ({ href, children }) => (
    <a href={href} className="social-media-link m-r-1" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

  static renderSocialMediaLinks = movie => (
    <div className="flex-row m-t-2">
      {movie.external_ids.imdb_id && (
        <MoviePage.SocialMediaLink href={`https://imdb.com/${movie.external_ids.imdb_id}`}>
          <i className="fab fa-imdb"></i>
        </MoviePage.SocialMediaLink>
      )}
      {movie.external_ids.facebook_id && (
        <MoviePage.SocialMediaLink href={`https://facebook.com/${movie.external_ids.facebook_id}`}>
          <i className="fab fa-facebook"></i>
        </MoviePage.SocialMediaLink>
      )}
      {movie.external_ids.instagram_id && (
        <MoviePage.SocialMediaLink href={`https://instagram.com/${movie.external_ids.instagram_id}`}>
          <i className="fab fa-instagram"></i>
        </MoviePage.SocialMediaLink>
      )}
      {movie.external_ids.twitter_id && (
        <MoviePage.SocialMediaLink href={`https://twitter.com/${movie.external_ids.twitter_id}`}>
          <i className="fab fa-twitter"></i>
        </MoviePage.SocialMediaLink>
      )}
    </div>
  );

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
      data: PropTypes.shape({
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
