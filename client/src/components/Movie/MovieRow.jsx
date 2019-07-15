import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';

import moviePreviewShape from './proptypes';
import baseImageURL from '../../utils/baseImageURL';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  margin: 1rem 0.5rem;
  padding: 0.5rem;

  border: ${props => props.theme.borderWidth} solid ${props => props.theme.colors.lightAccent};
  border-radius: ${props => props.theme.borderRadius};

  width: 425px;
  min-height: 135px;

  &:hover {
    border: ${props => props.theme.borderWidth} solid ${props => props.theme.colors.accent};
  }

  img {
    width: 75px;
  }

  .title {
    border-bottom: 2px solid ${props => props.theme.colors.accent};
  }

  .genre {
    text-transform: uppercase;
    color: ${props => props.theme.colors.text};
    font-size: 0.75rem;
  }
`;

const MovieRow = ({ result, id, genres }) => (
  <Link to={`/movie/${id}`}>
    <Row>
      <img src={`${baseImageURL}/w500/${result.poster_path}`} alt="" />
      <div className="flex-col items-baseline m-l-1">
        <h3 className="title m-b-h m-t-0">{result.title}</h3>
        <div className="m-t-h flex-row flex-wrap">
          {genres.map(genre => (
            <span key={genre.id} className="genre m-r-1">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </Row>
  </Link>
);

const propsAreEqual = (prevProps, nextProps) => prevProps.id === nextProps.id;

MovieRow.propTypes = {
  result: moviePreviewShape.isRequired,
  id: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.exact({ id: PropTypes.number, name: PropTypes.string })),
};

export default React.memo(MovieRow, propsAreEqual);
