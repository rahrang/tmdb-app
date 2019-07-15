import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .header {
    a.back {
      font-size: 1.5rem;
    }

    border-bottom: ${props => props.theme.borderWidth} solid ${props => props.theme.colors.accent};
    width: 100%;
  }

  .poster {
    width: 350px;
  }

  .social-media-link {
    color: ${props => props.theme.colors.text};
    font-size: 1.5rem;

    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }

  h4 {
    margin-bottom: 0.5rem;
  }
`;
