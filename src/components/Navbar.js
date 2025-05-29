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
  <Nav style={{alignItems:'center'}}>
    <StyledLink to="/"><img src="this-side-up-logo_white.png" alt="This Side Up logo" style={{padding: '13px 20px 13px 70px'}} width="290px"/></StyledLink>
    <div >
      <StyledLink to="/products">Producks</StyledLink>
      <StyledLink to="/about">About</StyledLink>
      <StyledLink to="/faq">FAQ</StyledLink>
    </div>
    
  </Nav>
);

export default Navbar;
