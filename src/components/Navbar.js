// File: src/components/layout/Navbar.js (or wherever your Navbar.js is)
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css'; // Assuming your global styles or Tailwind base is here
import styled from 'styled-components';
// 5. Import react-icons for Navbar
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa'; 

const Nav = styled.nav`
  background: #222; /* Figma has a darker, almost black navbar: #1A1A1A or similar */
  /* Let's adjust to match Figma's darker theme more closely */
  background-color: var(--color-background-dark-deep, #121212); /* Example dark color */
  color: white;
  padding: 0 1rem; /* Adjusted padding */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Changed from fixed to relative if it's part of normal page flow */
  /* If you want a sticky navbar, use position: sticky; top: 0; */
  z-index: 1000; /* Keep z-index high */
  height: var(--navbar-height, 80px); /* Example: use CSS var for height */
  /* border-bottom: 1px solid #333; */ /* Optional subtle separator */
`;

const LogoLink = styled(Link)`
  padding: 0.5rem 0; /* Adjust padding around logo */
  img {
    height: 40px; /* Control logo height */
    width: auto;
    display: block; /* Remove extra space below image */
  }
   margin-left: var(--spacing-xl, 32px); /* Match Figma's left spacing for logo */
`;


const NavLinks = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 2.5rem); /* Responsive gap */
  align-items: center;
  /* Centering a bit more robustly if needed, but current setup is okay for Figma */
`;

const NavItem = styled.div`
  position: relative; /* For dropdown positioning */
`;

const StyledLink = styled(Link)`
  color: var(--color-text-nav-light, #E0E0E0); /* Lighter text for nav links */
  text-decoration: none;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem); /* Responsive font size */
  font-weight: 500; /* Regular weight */
  transition: color 0.2s ease;
  padding: 0.5rem 0.75rem; /* Standardized padding */
  
  &:hover {
    color: var(--color-primary-purple-light, #9370DB); /* Brighter purple on hover */
  }

  &.active {
    color: var(--color-primary-purple, #7B68EE); /* Active link color from Figma */
    font-weight: 600; /* Slightly bolder for active */
  }
`;

const ProductsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem); /* Spacing from "Products" link */
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-background-dark-lighter, #2C2C2C); /* Darker dropdown */
  border-radius: var(--border-radius-m, 6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  margin-top: 0.5rem;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  min-width: 220px; /* Slightly wider */
  z-index: 1001;

  &::before { /* Arrow pointing to "Products" link */
    content: '';
    position: absolute;
    bottom: 100%; /* Position arrow above dropdown */
    left: 50%;
    transform: translateX(-50%);
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid var(--color-background-dark-lighter, #2C2C2C);
  }
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
`;

const CategoryLink = styled(Link)`
  color: var(--color-text-nav-light, #E0E0E0);
  text-decoration: none;
  padding: 0.6rem 1rem; /* Increased padding */
  border-radius: var(--border-radius-s, 4px);
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 0.9rem;
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif; /* Ensure this font is loaded */
  display: block;

  &:hover {
    background: var(--color-primary-purple-dark, #4B0082); /* Darker purple on hover */
    color: white;
  }
`;

const DropdownTitle = styled.h3`
  color: white;
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0.5rem 0.5rem; /* Adjusted padding */
  font-weight: 600;
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  border-bottom: 1px solid var(--color-primary-purple, #5D3FD3); /* Purple border */
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.5rem); /* Responsive gap */
  margin-right: var(--spacing-xl, 32px); /* Match Figma's right spacing */
`;

const IconLink = styled(Link)`
  color: var(--color-text-nav-light, #E0E0E0);
  font-size: 1.5rem; /* Icon size */
  padding: 0.5rem; /* Clickable area */
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-primary-purple-light, #9370DB);
  }
  &.active { // You might not need an 'active' state for action icons like search/cart
    color: var(--color-primary-purple, #7B68EE);
  }
`;


const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // This list should ideally come from your ProductContext or Data.js for consistency
  const productCategories = [
    { name: 'All Products', path: '/products' },
    { name: 'Skimboards', path: '/products/category/Skimboards' },
    { name: 'Sunscreen', path: '/products/category/Sunscreen' },
    { name: 'Beach Bags', path: '/products/category/Beach Bags' },
    { name: 'Hats', path: '/products/category/Hats' },
    // Add more or fetch dynamically
  ];

  return (
    <Nav id='font1'> {/* Assuming font1 is defined in your index.css or global styles */}
      <LogoLink to="/">
        <img 
          src="/this-side-up-logo_white.png" // Assuming logo is in public folder
          alt="This Side Up logo" 
        />
      </LogoLink>
      
      {/* Centered Navigation Links */}
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
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
          <NavItem>
            <StyledLink 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink 
              to="/faq" 
              className={location.pathname === '/faq' ? 'active' : ''}
            >
              FAQ
            </StyledLink>
          </NavItem>
        </NavLinks>
      </div>

      <NavActions>
        {/* 5. Using react-icons for Navbar actions */}
        <IconLink
            to="/search" 
            aria-label="Search"
            // className={location.pathname === '/search' ? 'active' : ''} // Optional active state
          >
            <FaSearch />
        </IconLink>
        <IconLink
            to="/cart" 
            aria-label="Shopping Cart"
            // className={location.pathname === '/cart' ? 'active' : ''}  // Optional active state
          >
            <FaShoppingCart />
        </IconLink>
        <IconLink
            to="/profile" // Assuming a profile page
            aria-label="User Profile"
            // className={location.pathname === '/profile' ? 'active' : ''} // Optional active state
          >
            <FaUser />
        </IconLink>
      </NavActions>
    </Nav>
  );
};

export default Navbar;