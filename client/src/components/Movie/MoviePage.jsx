import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash.get';

import { fetchMovieByID } from '../../actions/movie';

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
      <div>
        <h1>{movie.title}</h1>
        <pre>{JSON.stringify(movie, null, 2)}</pre>
      </div>
    );
  };

  render() {
    const movie = this.getMovieObj();

    if (!movie.resolved) {
      return <div>Loading...</div>;
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
