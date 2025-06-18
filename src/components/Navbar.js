// File: src/components/Navbar.js
import React, { useState, useEffect } from 'react'; // Added useEffect for the responsive part if needed
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Removed: import '../index.css'; // Should be handled by global styles or component-specific
import styled, { css } from 'styled-components'; // Added css for potential use
import TSULogo from '../icons/this-side-up-logo_white.png';
import SearchPNG from '../icons/icons8-search.png';
import CloseIcon from '../icons/icons8-close.png';
import CartIconImg from '../icons/icons8-cart.png'; // Renamed from CartIcon
import UserIconImg from '../icons/icons8-user.png'; // Renamed from UserIcon

// Assuming AuthContext is correctly located
import { useAuth } from '../contexts/AuthContext'; // <<<<<<<<<<< IMPORT useAuth

// (Keep your existing styled components: Nav, LogoLink, DesktopNavLinksContainer, NavItem, StyledLink, etc.)
// ... (your existing styled components up to UserDropdownMenu)

const Nav = styled.nav`
  background: #222;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1000;
  height: 106px;
  font-family: "Inria Serif", serif; /* From original #font1 */
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
`;

const NavItem = styled.div`
  position: relative;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  
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
  background: white; /* Let's try #333 for better theme consistency */
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  margin-top: 0.5rem;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  transform: ${props => props.show ? 'translateY(0) translateX(-50%)' : 'translateY(-10px) translateX(-50%)'};
  min-width: 200px;
  z-index: 1001;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%; /* Changed from top: -6px */
    left: 50%;
    transform: translateX(-50%) ;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white; /* Matches dropdown background */
  }
`;
const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
`;

const CategoryLink = styled(Link)`
  color: #333; /* For white background dropdown */
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.85rem;
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  display: block;

  &:hover {
    background: #f0f0f0; /* Light hover for white background */
    color: #b19cd9;
    transform: translateX(4px);
  }
`;

const DropdownTitle = styled.h3`
  color: #333; /* For white background dropdown */
  font-size: 1rem;
  margin: 0 0 1rem 0;
  padding: 0 1rem;
  font-weight: 600;
  font-family: 'Instrument Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  border-bottom: 2px solid #e0e0e0; /* Lighter border for white background */
  padding-bottom: 0.5rem;
`;


const RightIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px; /* Spacing between icons */
  margin-right: 20px; /* Overall margin for the group */
`;


// Search Bar Component
const SearchInputStyled = styled.input`
  height: 40px;
  align-self: center;
  box-sizing: border-box;
  padding: 10px 40px 10px 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 250px; /* Default width */
  position: relative;
  /* Removed bottom and right positioning which were likely from #search ID */

  /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 200px;
  }
  @media (max-width: 480px) {
    width: 150px;
    font-size: 0.9rem;
    padding: 8px 30px 8px 8px;
  }
`;

const SearchIconTrigger = styled.img`
  width: 30px; /* Adjusted size */
  height: 30px; /* Adjusted size */
  cursor: pointer;
`;

const CloseSearchIconStyled = styled.img`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px; /* Adjusted size */
  height: 20px; /* Adjusted size */
  cursor: pointer;
`;

function SearchBar() { // Changed name from SearchIcon
  const [isVisible, setIsVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate(); // Correct hook

  const handleClick = () => {
    setIsVisible(prev => !prev);
    if (isVisible) setKeyword(''); // Clear keyword when closing
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`); // Corrected navigation
      setIsVisible(false);
      setKeyword('');
    }
  }

  return (
    <div> {/* Keep a wrapping div if needed for layout by parent */}
      {isVisible ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <form onSubmit={handleSubmit}> {/* Added onSubmit to form */}
            <SearchInputStyled // Using styled component
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={handleInputChange}
              autoFocus // Focus when visible
            />
            <CloseSearchIconStyled
              src={CloseIcon}
              alt="Close search"
              onClick={handleClick}
            />
          </form>
        </div>
      ) : (
        <SearchIconTrigger // Using styled component for trigger
          src={SearchPNG}
          alt="Search icon"
          onClick={handleClick}
        />
      )}
    </div>
  );
}


// User Dropdown Component
const UserDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const UserIconTrigger = styled.img`
  width: 30px; /* Adjusted size */
  height: 30px; /* Adjusted size */
  cursor: pointer;
`;

const UserDropdownMenuStyled = styled.div` // Renamed from UserDropdownMenu to avoid conflict
  position: absolute;
  top: calc(100% + 10px); /* Space from icon */
  right: 0;
  background-color: #333; /* Darker background */
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  width: 200px; /* Adjusted width */
  border-radius: 8px;
  overflow: hidden;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const DropdownLink = styled.button` // Using button for better semantics and styling
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  padding: 12px 20px; /* Adjusted padding */
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.9rem; /* Adjusted font size */
  text-align: left;
  width: 100%;
  font-family: 'Instrument Sans', sans-serif; /* Consistent font */

  &:hover {
    background-color: #4a4a4a; /* Darker hover */
    color: #b19cd9; /* Highlight color */
  }
`;

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth(); // Get auth state

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/'); // Redirect to home after logout
  };

  return (
    <UserDropdownContainer>
      <UserIconTrigger
        src={UserIconImg}
        alt="User icon"
        onClick={toggleDropdown}
      />

      {isOpen && (
        <UserDropdownMenuStyled>
          {isAuthenticated && currentUser ? ( // Check if user is authenticated
            <>
              <DropdownLink onClick={() => handleNavigate('/profile')}> {/* Placeholder for profile page */}
                Hi, {currentUser.name.split(' ')[0]} {/* Display first name */}
              </DropdownLink>
              <DropdownLink onClick={() => handleNavigate('/my-orders')}> {/* Placeholder */}
                My Orders
              </DropdownLink>
              <DropdownLink onClick={handleLogout}>
                Logout
              </DropdownLink>
            </>
          ) : (
            <>
              <DropdownLink onClick={() => handleNavigate('/login')}>
                Sign In
              </DropdownLink>
              <DropdownLink onClick={() => handleNavigate('/signup')}>
                Create an Account
              </DropdownLink>
            </>
          )}
        </UserDropdownMenuStyled>
      )}
    </UserDropdownContainer>
  );
}

// Main Navbar
const Navbar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const productCategories = [
    { name: 'All Products', path: '/products' },
    { name: 'Skimboards', path: '/products/category/Skimboards' },
    { name: 'T-Shirts', path: '/products/category/T-Shirts' },
    { name: 'Boardshorts', path: '/products/category/Boardshorts' },
    { name: 'Accessories', path: '/products/category/Accessories' },
    // { name: 'Beach Bags', path: '/products/category/Beach Bags' },
    // { name: 'Towels', path: '/products/category/Towels' }
  ];

  return (
    <Nav> {/* Removed id='font1' - apply font-family directly in Nav styled component */}
      <StyledLink to="/">
        <img 
          src={TSULogo} 
          alt="This Side Up logo" 
          style={{ height: '50px', width: 'auto', marginLeft: '20px' }} // Adjusted logo style for better control
        />
      </StyledLink>
      <NavLinks>
        <NavItem
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <StyledLink 
            to="/products" 
            className={location.pathname.startsWith('/products') ? 'active' : ''}
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
            to="/design-skimboard" 
            className={location.pathname === '/design-skimboard' ? 'active' : ''}
          >
            Customise
          </StyledLink>
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
      
      {/* Removed the div with fixed height and overflow hidden. Using RightIconsContainer now. */}
      <RightIconsContainer>
        <SearchBar /> {/* Use the renamed component */}
        <Link 
            to="/shoppingCart" 
            className={location.pathname === '/shoppingCart' ? 'active' : ''}
            style={{ display: 'flex', alignItems: 'center' }} // Ensure icon aligns well
          >
            <img src={CartIconImg} // Use renamed CartIconImg
            style={{ width: '30px', height: '30px' }} // Adjusted size
            alt='Cart icon'
            />
        </Link>
        <UserDropdown />
      </RightIconsContainer>
    </Nav>
  );
};

export default Navbar;