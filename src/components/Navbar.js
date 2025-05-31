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
  left: 0;
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 0;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  min-width: 180px;
  z-index: 1001;
`;

const DropdownGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 12px 20px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  display: block;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f8f9fa;
    color: #b19cd9;
  }
`;

const DropdownTitle = styled.div`
  display: none;
`;

const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const productCategories = [
    { name: 'All Products', path: '/products' },
    { name: 'Skimboards', path: '/products/category/Skimboards' },
    { name: 'T-Shirts', path: '/products/category/T-Shirts' },
    { name: 'Boardshorts', path: '/products/category/Boardshorts' },
    { name: 'Accessories', path: '/products/category/Accessories' },
    { name: 'Beach Bags', path: '/products/category/Beach Bags' },
    { name: 'Towels', path: '/products/category/Towels' }
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