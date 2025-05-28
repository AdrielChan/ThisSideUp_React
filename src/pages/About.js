import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;

const About = () => {
  return (
    <Wrapper>
      <h1>About Us</h1>
      <p>Explore our skimboards, design your own, or search products!</p>
    </Wrapper>
  );
};

export default About;
