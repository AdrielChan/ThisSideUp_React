import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

// Import icons (you'll need to add an icon library like react-icons or use SVGs)
// yarn add react-icons
import { FaSearch, FaShoppingCart, FaUserCircle, FaTimes } from 'react-icons/fa';

const NavContainer = styled.header`
  background-color: var(--color-background-dark, #1A1A1A);
  color: var(--color-text-light, #FFFFFF);
  padding: 0 var(--spacing-m, 16px);
  height: var(--header-height, 70px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

const LogoLink = styled(Link)`
  font-family: var(--font-heading); /* Assuming a specific logo font or it's an image */
  font-size: var(--font-size-xlarge, 24px);
  font-weight: bold;
  color: var(--color-text-light, #FFFFFF);
  text-decoration: none;
  display: flex;
  align-items: center;
  img { // If using an image logo
    height: 40px; // Adjust as needed
    margin-right: var(--spacing-s);
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-l, 24px);
  @media (max-width: 768px) {
    display: none; // Basic responsiveness: hide on smaller screens, implement burger menu later
  }
`;

const StyledLink = styled(Link)`
  color: var(--color-neutral-gray, #BDBDBD);
  text-decoration: none;
  font-size: var(--font-size-medium, 16px);
  padding: var(--spacing-s, 8px) 0;
  position: relative;

  &:hover, &.active {
    color: var(--color-text-light, #FFFFFF);
  }
  
  &.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-secondary-peach, #FFDAB9);
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-l, 24px);
`;

const IconLink = styled(Link)`
  color: var(--color-neutral-gray, #BDBDBD);
  font-size: var(--font-size-large, 20px); /* Icon size */
  position: relative;
  &:hover {
    color: var(--color-text-light, #FFFFFF);
  }
`;

const CartIconBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: var(--color-secondary-peach-dark, #FFA07A);
  color: var(--color-text-dark, #333333);
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: bold;
`;

const SearchToggleIcon = styled(FaSearch)`
  cursor: pointer;
  color: var(--color-neutral-gray, #BDBDBD);
  font-size: var(--font-size-large, 20px);
   &:hover {
    color: var(--color-text-light, #FFFFFF);
  }
`;

const SearchBarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  align-items: flex-start; /* Align to top */
  justify-content: center;
  padding-top: 15vh; /* Push search bar down a bit */
  z-index: 1001; /* Above navbar */
`;

const SearchInputContainer = styled.div`
  background-color: var(--color-background-light, #F8F8F8);
  padding: var(--spacing-l, 24px);
  border-radius: var(--border-radius, 8px);
  width: 90%;
  max-width: 600px;
  display: flex;
  align-items: center;
  position: relative; // For the close button
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: var(--spacing-m, 16px);
  padding-right: calc(var(--spacing-m, 16px) + 30px); // Space for potential clear button inside input
  border: 1px solid var(--color-light-gray-border, #E0E0E0);
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-large, 20px);
  font-family: var(--font-heading); // To match "Search" placeholder in Figma
  color: var(--color-text-dark, #333333);

  &::placeholder {
    color: var(--color-text-gray, #757575);
    font-family: var(--font-heading); // "Search" placeholder in serif
  }
`;

const CloseSearchButton = styled(FaTimes)`
  position: absolute;
  top: var(--spacing-s, 8px);
  right: var(--spacing-s, 8px);
  font-size: var(--font-size-xlarge, 24px);
  color: var(--color-text-gray, #757575);
  cursor: pointer;
  &:hover {
    color: var(--color-text-dark, #333333);
  }
`;

const Navbar = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchOverlay(false);
      setSearchTerm('');
    }
  };

  return (
    <>
      <NavContainer>
        <LogoLink to="/">
          {/* <img src="/assets/images/logo_white_lightning.png" alt="This Side Up"/> Replace with your actual logo path */}
          This Side Up
        </LogoLink>
        <NavLinks>
          <StyledLink to="/products">Products</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/faq">FAQ</StyledLink>
        </NavLinks>
        <IconsContainer>
          <SearchToggleIcon onClick={() => setShowSearchOverlay(true)} />
          <IconLink to="/cart">
            <FaShoppingCart />
            {itemCount > 0 && <CartIconBadge>{itemCount}</CartIconBadge>}
          </IconLink>
          {isAuthenticated ? (
            <IconLink to="/order-status" title={currentUser?.name || 'My Account'}>
              <FaUserCircle />
              {/* Optionally display username or dropdown on hover/click */}
            </IconLink>
          ) : (
            <IconLink to="/login" title="Login/Sign Up">
              <FaUserCircle />
            </IconLink>
          )}
        </IconsContainer>
      </NavContainer>

      {showSearchOverlay && (
        <SearchBarOverlay onClick={() => setShowSearchOverlay(false) /* Close on overlay click */}>
          <SearchInputContainer onClick={(e) => e.stopPropagation() /* Prevent closing when clicking inside */}>
            <CloseSearchButton onClick={() => setShowSearchOverlay(false)} />
            <form onSubmit={handleSearchSubmit} style={{width: '100%'}}>
              <SearchInput
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </form>
          </SearchInputContainer>
        </SearchBarOverlay>
      )}
    </>
  );
};

export default Navbar;
