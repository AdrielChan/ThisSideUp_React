// File: src/components/common/LoadingSpinner.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: ${({ theme }) => theme.colors.primaryPurple};
  animation: ${spin} 1s ease infinite;
  margin: 20px auto;
`;

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px; // Ensure it's visible on page load
  width: 100%;
`;

const LoadingSpinner = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <LoadingSpinnerContainer style={{ minHeight: 'calc(100vh - 140px)' /* Adjust based on header/footer */ }}>
        <Spinner />
      </LoadingSpinnerContainer>
    );
  }
  return <Spinner />;
};

export default LoadingSpinner;