import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #222;
  color: white;
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => (
  <Nav>
    <StyledLink to="/">Home</StyledLink>
    <StyledLink to="/design">Design Your Skimboard</StyledLink>
    <StyledLink to="/search">Search</StyledLink>
  </Nav>
);

export default Navbar;
