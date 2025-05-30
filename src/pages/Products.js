// File: src/pages/products/ProductsPage.js (Example of corrected imports)
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Corrected import paths assuming ProductsPage.js is in src/pages/products/
import { useProducts } from '../contexts/ProductContext'; // Path was likely correct if ProductContext.js had the ../data/Data error
import ProductCard from './ProductCard';
import LoadingSpinner from '../components/layout/LoadingSpinner';


const PageWrapper = styled.div`
  background-color: var(--color-background-dark, #1A1A1A); /* Dark background for the page */
  color: var(--color-text-light, #FFFFFF);
  min-height: calc(100vh - var(--header-height, 70px)); /* Full height minus navbar */
  padding: var(--spacing-l, 24px) var(--spacing-m, 16px);
  padding-bottom: 80px; /* Space for the sticky cart button */
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between; /* Align items to sides */
  align-items: center;
  margin-bottom: var(--spacing-l, 24px);
  padding: 0 var(--spacing-m, 16px); /* Match content padding */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const CategorySelectorWrapper = styled.div`
  position: relative;
`;

// Styled to look like the Figma button/dropdown
const CategoryDisplayButton = styled.button`
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-primary-purple, #5D3FD3); /* Purple text on peach */
  padding: var(--spacing-s, 8px) var(--spacing-xl, 32px) var(--spacing-s, 8px) var(--spacing-m, 16px); /* More padding on right for arrow */
  border: none;
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-large, 20px);
  font-family: var(--font-heading); /* Serif font for "Skimboards" */
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 200px; /* Give it some base width */
  justify-content: space-between; /* Pushes text and arrow apart */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  svg { /* Style for the dropdown arrow */
    margin-left: var(--spacing-m, 16px);
    font-size: var(--font-size-medium, 16px);
  }
`;

const CategoryDropdownList = styled.ul`
  position: absolute;
  top: calc(100% + var(--spacing-xs, 4px));
  left: 0;
  background-color: var(--color-background-dark-lighter, #2C2C2C);
  border: 1px solid var(--color-primary-purple, #5D3FD3);
  border-radius: var(--border-radius, 8px);
  list-style: none;
  padding: var(--spacing-s, 8px) 0;
  margin: 0;
  z-index: 10;
  min-width: 100%; /* Same width as button */
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

const CategoryDropdownItem = styled.li`
  padding: var(--spacing-s, 8px) var(--spacing-m, 16px);
  color: var(--color-text-light, #FFFFFF);
  cursor: pointer;
  font-size: var(--font-size-medium, 16px);

  &:hover {
    background-color: var(--color-primary-purple, #5D3FD3);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Adjust for 4-5 columns */
  gap: var(--spacing-l, 24px);
  max-width: 1200px;
  margin: 0 auto; /* Center the grid */

  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
   @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Or 1fr for single column */
  }
`;

const StickyCartButton = styled(Link)`
  position: fixed;
  bottom: var(--spacing-l, 24px);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-text-dark, #333333);
  padding: var(--spacing-m, 16px) var(--spacing-xl, 32px);
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-large, 20px);
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  z-index: 999;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-secondary-peach-dark, #FFA07A);
  }
`;

const NoProductsMessage = styled.p`
  text-align: center;
  font-size: var(--font-size-large, 20px);
  margin-top: var(--spacing-xl, 32px);
  color: var(--color-neutral-gray, #BDBDBD);
`;


const Products = () => {
  const { categoryName } = useParams(); // Gets category from URL if present
  const navigate = useNavigate();
  const { 
    filteredProducts, 
    loading, 
    error, 
    categories, // Array of category strings: ["All", "Skimboards", "Hats", ...]
    searchProducts, // Function to trigger product fetch/filter
    currentCategory, // To display on button
    setCurrentCategory // From ProductContext to set it
  } = useProducts();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const targetCategory = categoryName || 'All'; // Default to "All" if no category in URL
    setCurrentCategory(targetCategory); // Update context's current category
    searchProducts('', targetCategory, 'name_asc'); // Fetch products for this category, default sort
  }, [categoryName, setCurrentCategory, searchProducts]);


  const handleCategorySelect = (category) => {
    setShowDropdown(false);
    if (category === "All") {
      navigate('/products');
    } else {
      navigate(`/products/category/${encodeURIComponent(category)}`);
    }
  };
  
  if (error) return <PageWrapper><NoProductsMessage>Error loading products: {error}</NoProductsMessage></PageWrapper>;

  return (
    <PageWrapper>
      <PageHeader>
        <CategorySelectorWrapper>
          <CategoryDisplayButton onClick={() => setShowDropdown(!showDropdown)}>
            {currentCategory === "All" ? "All Products" : currentCategory}

          </CategoryDisplayButton>
          {showDropdown && (
            <CategoryDropdownList>
              {categories.map((cat) => ( // 'categories' should come from ProductContext
                <CategoryDropdownItem 
                  key={cat} 
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat === "All" ? "All Products" : cat}
                </CategoryDropdownItem>
              ))}
            </CategoryDropdownList>
          )}
        </CategorySelectorWrapper>
        {/* Placeholder for other filters or sort options if needed in future */}
        {/* <FaFilter /> */}
      </PageHeader>

      {loading ? (
        <LoadingSpinner fullPage={!filteredProducts.length} /> 
      ) : filteredProducts.length > 0 ? (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <NoProductsMessage>No products found in this category.</NoProductsMessage>
      )}

      <StickyCartButton to="/cart">Shopping cart</StickyCartButton>
    </PageWrapper>
  );
};

export default Products;
