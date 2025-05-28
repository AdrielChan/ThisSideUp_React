import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Products = () => {
  return (
    <Wrapper>
      <h1>Products</h1>
      <p>Explore our skimboards, design your own, or search products!</p>
    </Wrapper>
  );
};

export default Products;
