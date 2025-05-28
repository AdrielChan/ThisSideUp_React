// File: src/pages/Search.js
import React, { useState } from 'react';
import styled from 'styled-components';
// Change 'products' to 'initialProducts'
import { initialProducts } from '../Data'; // Corrected import

const Wrapper = styled.div` padding: 2rem; `;
const SearchInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 500px; /* Added for better layout */
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;
const ProductCard = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  background-color: #fff;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: var(--color-primary-purple, #5D3FD3); /* Fallback if CSS var not loaded */
  }

  p {
    margin-bottom: 0;
    color: var(--color-text-gray, #757575);
  }
`;

const Search = () => {
  const [query, setQuery] = useState("");

  // Use initialProducts here
  const filteredProducts = initialProducts
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Wrapper>
      <h2>Search Products</h2>
      <SearchInput
        type="search"
        placeholder="Search by name..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {query && filteredProducts.length === 0 && (
        <p>No products found matching "{query}".</p>
      )}
      <ProductGrid>
        {filteredProducts.map(p => (
          <ProductCard key={p._id}> {/* Assuming your products have _id from Data.js */}
            <h3>{p.name}</h3>
            <p>${p.price.toFixed(2)}</p>
            {/* You can add more product details or an image here */}
          </ProductCard>
        ))}
      </ProductGrid>
    </Wrapper>
  );
};

export default Search;