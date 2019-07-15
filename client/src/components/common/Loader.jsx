import React from 'react';
import styled from 'styled-components';

const PageLoaderWrapper = styled.div`
  height: 75vh;
  font-size: 4rem;
  color: ${props => props.theme.colors.accent};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageLoader = () => (
  <PageLoaderWrapper>
    <i className="fas fa-spinner fa-pulse"></i>
  </PageLoaderWrapper>
);

const Loader = () => (
  <div>
    <i className="fas fa-spinner fa-pulse"></i>
  </div>
);

export default Loader;
