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
    <StyledLink to="/"><img src="this-side-up-logo_white.png" alt="This Side Up logo" style={{padding: '10px 20px 10px 60px'}} width="28%"/></StyledLink>
    <StyledLink to="/design">Design Your Skimboard</StyledLink>
    <StyledLink to="/search">Search</StyledLink>
  </Nav>
);

export default Navbar;
