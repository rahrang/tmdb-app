import styled from 'styled-components';

export default styled.div`
  .search-input {
    background-color: ${props => props.theme.colors.lightAccent};
    padding-top: 1rem;
    padding-bottom: 1rem;

    input {
      font-size: 1.5rem;
      width: 400px;

      border: ${props => props.theme.borderWidth} solid ${props => props.theme.colors.accent};
      border-radius: ${props => props.theme.borderRadius};
      box-shadow: none;

      padding: 0.5rem;
    }
  }
`;
