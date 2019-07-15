import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import numbro from 'numbro';

const ChangePageButton = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;

  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  border: ${props => props.theme.borderWidth} solid ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius};

  &:hover {
    border: ${props => props.theme.borderWidth} solid
      ${props => (props.disabled ? props.theme.colors.text : props.theme.colors.accent)};
  }

  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }

  i {
    font-size: 0.5rem;
  }
`;

class Paginator extends React.Component {
  render() {
    const { changePage, currentPage, lastPage } = this.props;
    return (
      <div className="flex-row flex-wrap content-between items-baseline">
        <div className="flex-row flex-wrap">
          <ChangePageButton
            className="m-r-1"
            type="button"
            onClick={() => changePage(1)}
            disabled={currentPage - 1 < 1}
          >
            <i className="fas fa-chevron-left"></i>
            <i className="fas fa-chevron-left"></i>
            <span>First Page</span>
          </ChangePageButton>
          <ChangePageButton
            className="m-r-1"
            type="button"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage - 1 < 1}
          >
            <i className="fas fa-chevron-left"></i>
            <span>Previous Page</span>
          </ChangePageButton>
        </div>
        <div>{`Page ${numbro(currentPage).format({ thousandSeparated: true })} of ${numbro(lastPage).format({
          thousandSeparated: true,
        })}`}</div>
        <div className="flex-row flex-wrap">
          <ChangePageButton
            className="m-l-1"
            type="button"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage + 1 > lastPage || currentPage + 1 > 1000}
          >
            <span>Next Page</span>
            <i className="fas fa-chevron-right"></i>
          </ChangePageButton>
          <ChangePageButton
            className="m-l-1"
            type="button"
            onClick={() => changePage(lastPage)}
            disabled={currentPage + 1 > lastPage || lastPage > 1000}
          >
            <span>Last Page</span>
            <i className="fas fa-chevron-right"></i>
            <i className="fas fa-chevron-right"></i>
          </ChangePageButton>
        </div>
      </div>
    );
  }
}

export default Paginator;

Paginator.propTypes = {
  changePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
};
