// File: src/pages/products/ProductsPage.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';


// Corrected import paths assuming ProductsPage.js is in src/pages/products/
import { useProducts } from '../contexts/ProductContext'; 
import ProductCard from './ProductCard'; // CORRECTED PATH

// --- STYLED COMPONENTS (Similar to your previous version) ---
const PageWrapper = styled.div`
  background-color: var(--color-primary-purple, #5D3FD3); /* Figma's dark purple page bg */
  color: var(--color-text-light, #FFFFFF);
  min-height: calc(100vh - var(--header-height, 70px));
  padding: var(--spacing-l, 24px) var(--spacing-m, 16px);
  padding-bottom: 100px; /* More space for the sticky cart button */
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: flex-start; /* Category selector to the left */
  align-items: center;
  margin-bottom: var(--spacing-l, 24px);
  padding: 0 var(--spacing-m, 16px);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const CategorySelectorWrapper = styled.div`
  position: relative;
`;

const CategoryDisplayButton = styled.button`
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-primary-purple, #5D3FD3);
  padding: var(--spacing-s, 8px) var(--spacing-xl, 32px) var(--spacing-s, 8px) var(--spacing-m, 16px);
  border: none;
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-large, 20px);
  font-family: var(--font-heading);
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 220px; 
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  svg {
    margin-left: var(--spacing-m, 16px);
    font-size: var(--font-size-medium, 16px);
  }
`;

const CategoryDropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background-color: var(--color-secondary-peach-dark, #FFA07A); /* Darker peach for dropdown */
  border: 1px solid var(--color-primary-purple, #5D3FD3);
  border-radius: var(--border-radius, 8px);
  list-style: none;
  padding: var(--spacing-s, 8px) 0;
  margin: 0;
  z-index: 10;
  min-width: 100%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
`;

const CategoryDropdownItem = styled.li`
  padding: var(--spacing-s, 8px) var(--spacing-m, 16px);
  color: var(--color-text-dark, #333333); /* Dark text on peach */
  cursor: pointer;
  font-size: var(--font-size-medium, 16px);
  font-weight: 500;

  &:hover {
    background-color: var(--color-primary-purple, #5D3FD3);
    color: var(--color-text-light, #FFFFFF);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjusted for Figma */
  gap: var(--spacing-l, 24px);
  max-width: 1200px;
  margin: 0 auto;
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

const MessageText = styled.p`
  text-align: center;
  font-size: var(--font-size-large, 20px);
  margin-top: var(--spacing-xl, 32px);
  color: var(--color-neutral-gray, #BDBDBD);
`;

const Products = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { 
    filteredProducts, 
    loading, 
    error, 
    categories, 
    currentCategory, 
    setCurrentCategory, // Use this to set category in context
    filterAndSortProducts // Use this to trigger filtering
  } = useProducts();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const targetCategory = categoryName || 'All';
    setCurrentCategory(targetCategory); // Update context so it knows the current category
    filterAndSortProducts(targetCategory); // Fetch/filter for this category
  }, [categoryName, setCurrentCategory, filterAndSortProducts]);

  const handleCategorySelect = (category) => {
    setShowDropdown(false);
    // The useEffect above will handle the actual filtering when the URL changes
    if (category === "All") {
      navigate('/products');
    } else {
      navigate(`/products/category/${encodeURIComponent(category)}`);
    }
  };
  
  if (error) return <PageWrapper><MessageText>Error: {error}</MessageText></PageWrapper>;
  // We are removing LoadingSpinner, so we'll show a message or just the empty grid if loading
  // or rely on the initial empty state of filteredProducts.

  return (
    <PageWrapper>
      <PageHeader>
        <CategorySelectorWrapper>
          <CategoryDisplayButton onClick={() => setShowDropdown(!showDropdown)}>
            {currentCategory === "All" ? "All Products" : currentCategory}
          </CategoryDisplayButton>
          {showDropdown && (
            <CategoryDropdownList>
              {categories.map((cat) => (
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
      </PageHeader>

      {loading && filteredProducts.length === 0 && <MessageText>Loading products...</MessageText>}
      
      {!loading && filteredProducts.length === 0 && !error && (
        <MessageText>No products found in this category.</MessageText>
      )}

      {filteredProducts.length > 0 && (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductGrid>
      )}

      <StickyCartButton to="/cart">Shopping cart</StickyCartButton>
    </PageWrapper>
  );
};

export default Products;