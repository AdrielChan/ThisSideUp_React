import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Home = () => {
  return (
    <Wrapper>
      <h1>Welcome to This Side Up</h1>
      <p>Explore our skimboards, design your own, or search products!</p>
    </Wrapper>
  );
};

export default Home;
