import { css, createGlobalStyle } from 'styled-components';

const flexStyles = css`
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .flex-center {
    align-items: center;
    justify-content: center;
  }
  .items-center {
    align-items: center;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-baseline {
    align-items: baseline;
  }
  .content-center {
    justify-content: center;
  }
  .content-start {
    justify-content: flex-start;
  }
  .content-end {
    justify-content: flex-end;
  }
  .content-around {
    justify-content: space-around;
  }
  .content-between {
    justify-content: space-between;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-1 {
    flex: 1;
  }
`;

export default createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    /* background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff9f2' fill-opacity='0.6'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
    font-size: 14px;
    font-family: 'Lato', sans-serif;

    .body-content {
      min-width: 400px;
      max-width: 1000px;
  
      margin: auto;
    }

    h1, h2, h3, h4 {
      color: ${props => props.theme.colors.header};
    }

    a {
      color: ${props => props.theme.colors.accent};
    }

    ${flexStyles};
  }
`;
