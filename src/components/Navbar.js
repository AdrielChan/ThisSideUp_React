import React, { useState } from 'react';
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
  position: relative;
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  padding-right: 70px;
`;

const NavItem = styled.div`
  position: relative;
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

const ProductsDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-top: 0.5rem;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  min-width: 200px;
  z-index: 1001;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 2px;
    transform: translateX(-50%) rotate(45deg);
  }
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const CategoryLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  display: block;

  &:hover {
    background: #f8f9fa;
    color: #b19cd9;
    transform: translateX(4px);
  }
`;

const DropdownTitle = styled.h3`
  color: #333;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  padding: 0 1rem;
  font-weight: 600;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
`;

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const productCategories = [
    { name: 'All Products', path: '/products' },
    { name: 'Skimboards', path: '/products/skimboards' },
    { name: 'T-Shirts', path: '/products/t-shirts' },
    { name: 'Boardshorts', path: '/products/boardshorts' },
    { name: 'Accessories', path: '/products/accessories' },
    { name: 'Beach Bags', path: '/products/beach-bags' },
    { name: 'Towels', path: '/products/towels' }
  ];

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
        <NavItem
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <StyledLink 
            to="/products" 
            className={location.pathname.includes('/products') ? 'active' : ''}
          >
            Products
          </StyledLink>
          <ProductsDropdown show={showDropdown}>
            <DropdownTitle>Shop by Category</DropdownTitle>
            <DropdownGrid>
              {productCategories.map((category, index) => (
                <CategoryLink 
                  key={index}
                  to={category.path}
                  onClick={() => setShowDropdown(false)}
                >
                  {category.name}
                </CategoryLink>
              ))}
            </DropdownGrid>
          </ProductsDropdown>
        </NavItem>
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