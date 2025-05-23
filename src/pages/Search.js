import React, { useState } from 'react';
import styled from 'styled-components';
import { products } from '../Data';

const Wrapper = styled.div` padding: 2rem; `;
const SearchInput = styled.input` padding: 0.5rem; margin-bottom: 1rem; width: 100%; `;
const Product = styled.div` margin-bottom: 1rem; `;

const Search = () => {
  const [query, setQuery] = useState("");

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Wrapper>
      <h2>Search Products</h2>
      <SearchInput placeholder="Search by name..." value={query} onChange={e => setQuery(e.target.value)} />
      {filtered.map(p => (
        <Product key={p.id}>
          <strong>{p.name}</strong> – ${p.price}
        </Product>
      ))}
    </Wrapper>
  );
};

export default Search;
