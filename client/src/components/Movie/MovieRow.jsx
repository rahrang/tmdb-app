import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';

import moviePreviewShape from './proptypes';
import baseImageURL from '../../utils/baseImageURL';

const Row = styled.tr`
  td {
    img {
      width: 100px;
    }
  }
`;

const MovieRow = ({ result, id }) => (
  <Row onClick={() => navigate(`/movie/${id}`)}>
    <td>
      <img src={`${baseImageURL}/w500/${result.poster_path}`} alt="" />
    </td>
    <td>{result.title}</td>
  </Row>
);

const propsAreEqual = (prevProps, nextProps) => prevProps.id === nextProps.id;

MovieRow.propTypes = {
  result: moviePreviewShape.isRequired,
  id: PropTypes.number.isRequired,
};

export default React.memo(MovieRow, propsAreEqual);
