import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #222;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  padding-right: 70px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #b19cd9;
  }

  &.active {
    color: #b19cd9;
    font-weight: bold;
  }
`;

const Navbar = () => {
  const location = useLocation();
  
  return (
    <Nav id='font1'>
      <StyledLink to="/">
        <img 
          src="this-side-up-logo_white.png" 
          alt="This Side Up logo" 
          style={{padding: '13px 10px 13px 90px'}} 
          width="290px"
        />
      </StyledLink>
      <NavLinks>
        <StyledLink 
          to="/products" 
          className={location.pathname === '/products' ? 'active' : ''}
        >
          Products
        </StyledLink>
        <StyledLink 
          to="/about" 
          className={location.pathname === '/about' ? 'active' : ''}
        >
          About
        </StyledLink>
        <StyledLink 
          to="/faq" 
          className={location.pathname === '/faq' ? 'active' : ''}
        >
          FAQ
        </StyledLink>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;