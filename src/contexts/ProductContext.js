// File: src/contexts/ProductContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
// This path MUST be correct. Assumes Data.js is at src/data/Data.js
import { 
    fetchProducts, 
    searchProductsAPI, 
    productCategories, 
    fetchProductById // Ensure Data.js exports this
} from '../Data'; 

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Stores all products once fetched
  const [filteredProducts, setFilteredProducts] = useState([]); // Products for display
  const [loading, setLoading] = useState(true); // Still useful to know if data is being fetched
  const [error, setError] = useState(null);
  
  const [currentCategory, setCurrentCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name_asc'); // Default sort, e.g., name A-Z

  // Initial load of all products
  const loadAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
      // Apply initial filter (all products, default sort)
      const initialFiltered = await searchProductsAPI('', 'All', sortBy);
      setFilteredProducts(initialFiltered);
    } catch (err) {
      setError(err.message || "Failed to fetch products.");
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy]); // Re-run if default sortBy changes, though unlikely

  useEffect(() => {
    loadAllProducts();
  }, [loadAllProducts]); // Load products on initial mount

  // Function to filter/sort products based on category and sort preference
  const filterAndSortProducts = useCallback(async (category = currentCategory, newSortBy = sortBy, term = '') => {
    setLoading(true);
    setError(null);
    setCurrentCategory(category); // Update current category state
    setSortBy(newSortBy);       // Update current sort state
    try {
      const results = await searchProductsAPI(term, category, newSortBy);
      setFilteredProducts(results);
    } catch (err) {
      setError(err.message || "Failed to filter/sort products.");
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [currentCategory, sortBy]); // Dependencies

  const getProductById = useCallback(async (id) => {
    // setLoading(true); // Optional: indicate loading for this specific fetch
    const productFromState = products.find(p => p._id === id);
    if (productFromState) {
      // setLoading(false);
      return productFromState;
    }
    try {
      const fetchedProduct = await fetchProductById(id); // From Data.js
      // setLoading(false);
      return fetchedProduct;
    } catch (err) {
      console.error(`Error fetching product by ID (${id}):`, err);
      // setLoading(false);
      setError(err.message || `Failed to fetch product ${id}.`);
      return null;
    }
  }, [products]); // Depends on 'products' state to check cache first

  const value = {
    products,             // All products
    filteredProducts,     // Products to display
    loading,              // Boolean indicating data fetch state
    error,                // Error message string or null
    currentCategory,
    setCurrentCategory,   // Allow pages to set this directly before calling filterAndSortProducts
    sortBy,
    setSortBy,            // Allow pages to set this directly
    categories: productCategories, // From Data.js
    filterAndSortProducts, // Main function to trigger filtering/sorting
    getProductById,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined || context === null) { // Check for null as well
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};