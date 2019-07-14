import PropTypes from 'prop-types';

export default PropTypes.exact({
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
});
