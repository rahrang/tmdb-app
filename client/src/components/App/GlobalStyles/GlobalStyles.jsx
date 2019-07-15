import { createGlobalStyle } from 'styled-components';

import flexStyles from './flexStyles';
import marginStyles from './marginStyles';

export default createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    /* background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff9f2' fill-opacity='0.6'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
    font-size: 16px;
    font-family: 'Lato', sans-serif;

    margin: 0;
    padding: 0;

    .body-content {
      min-width: 400px;
      max-width: 900px;
  
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 2rem;
    }

    h1, h2, h3, h4 {
      color: ${props => props.theme.colors.header};
    }

    a {
      color: ${props => props.theme.colors.accent};
      text-decoration: none;

      &:hover {
        color: ${props => props.theme.colors.text};
      }
    }

    p, input {
      color: ${props => props.theme.colors.text};
    }

    p, a {
      line-height: 1.75rem;
    }

    ${flexStyles};
    ${marginStyles};

    .text-left {
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
  }
`;
