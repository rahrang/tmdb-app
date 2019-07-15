import { css } from 'styled-components';

export default css`
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
