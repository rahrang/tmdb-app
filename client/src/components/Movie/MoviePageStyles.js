import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .header {
    border-bottom: ${props => props.theme.borderWidth} solid ${props => props.theme.colors.accent};
    width: 100%;
  }

  .poster {
    width: 350px;
  }
`;
