import styled from 'styled-components';

export default styled.button`
  color: ${props => props.theme.colors.text};
  border: none;
  border-bottom: ${props => props.theme.borderWidth} solid
    ${props => (props.active ? props.theme.colors.accent : props.theme.colors.text)};

  cursor: pointer;

  font-size: 1rem;
  margin-right: 0.5rem;
`;
