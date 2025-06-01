// File: src/pages/products/ProductsPage.js 
// (Rename your existing Products.js to this and place it in src/pages/products/)
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa'; // For dropdown arrow

// Corrected import paths assuming ProductsPage.js is in src/pages/products/
import { useProducts } from '../contexts/ProductContext'; 
import ProductCard from '../pages/ProductCard'; // Import the REUSABLE CARD

// --- STYLED COMPONENTS (Copied from your "Products.js" file in the prompt) ---
// Ensure these styles are appropriate for a product listing page
const PageWrapper = styled.div`
  background-color: var(--color-primary-purple, #5D3FD3);
  color: var(--color-text-light, #FFFFFF);
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: flex-start;
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
  padding: var(--spacing-s, 8px) var(--spacing-m, 16px); /* Adjusted padding */
  border: none;
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-large, 20px);
  font-family: var(--font-heading); /* Check var definition */
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 220px; 
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  svg { /* For FaChevronDown */
    margin-left: var(--spacing-s, 8px);
  }
`;

const CategoryDropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background-color: var(--color-secondary-peach-dark, #FFA07A);
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
  color: var(--color-text-dark, #333333);
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
  /* Ensure minmax is appropriate for your ProductCard size */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
  gap: var(--spacing-l, 24px);
  max-width: 1200px;
  margin: 0 auto;
`;

const StickyCartButton = styled(Link)`
  /* ... your existing styles ... */
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
`;

const MessageText = styled.p`
  text-align: center;
  font-size: var(--font-size-large, 20px);
  margin-top: var(--spacing-xl, 32px);
  color: var(--color-neutral-gray, #BDBDBD); /* Check var definition */
`;

const Products = () => { // Renamed from Products
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { 
    filteredProducts, 
    loading, 
    error, 
    categories, 
    currentCategory, 
    filterAndSortProducts
  } = useProducts();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const targetCategory = categoryName || 'All';
    // No need to call setCurrentCategory here if filterAndSortProducts handles it
    filterAndSortProducts(targetCategory); // Fetch/filter for this category
  }, [categoryName, filterAndSortProducts]); // filterAndSortProducts will update currentCategory in context

  const handleCategorySelect = (category) => {
    setShowDropdown(false);
    if (category === "All") {
      navigate('/products');
    } else {
      navigate(`/products/category/${encodeURIComponent(category)}`);
    }
    // The useEffect above will trigger the filtering due to URL change
  };
  
  return (
    <PageWrapper>
      <PageHeader>
        <StickyCartButton to="/cart">Shopping cart</StickyCartButton>
        <CategorySelectorWrapper>
          <CategoryDisplayButton onClick={() => setShowDropdown(!showDropdown)}>
            {currentCategory === "All" ? "All Products" : currentCategory}
            <FaChevronDown />
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

      {loading && <MessageText>Loading products...</MessageText>}
      {error && <MessageText>Error: {error}</MessageText>}
      
      {!loading && !error && filteredProducts.length === 0 && (
        <MessageText>No products found in this category.</MessageText>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductGrid>
      )}

      
    </PageWrapper>
  );
};

export default Products;