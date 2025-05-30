// File: src/contexts/ProductContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { fetchProducts, searchProductsAPI, productCategories, topSearchTerms } from '../Data';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating_desc'); // Default: Most Popular (by rating)

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
      // Initial filter based on default settings
      const initialFiltered = await searchProductsAPI('', 'All', 'rating_desc');
      setFilteredProducts(initialFiltered);
    } catch (err) {
      setError(err.message || "Failed to fetch products.");
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = useCallback(async (term = searchTerm, category = currentCategory, sort = sortBy) => {
    setLoading(true);
    setError(null);
    setSearchTerm(term);
    setCurrentCategory(category);
    setSortBy(sort);
    try {
      const results = await searchProductsAPI(term, category, sort);
      setFilteredProducts(results);
    } catch (err) {
      setError(err.message || "Failed to search products.");
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentCategory, sortBy]);
  
  const getProductById = useCallback(async (id) => {
    // For simplicity, find from existing products list if loaded
    // Or implement fetchProductById from Data.js if needed for direct access
    const product = products.find(p => p._id === id);
    if (product) return product;
    
    // Fallback if not in local state (e.g., direct link to product detail)
    try {
        const fetchedProduct = await import('../data/Data').then(mod => mod.fetchProductById(id));
        return fetchedProduct;
    } catch (err) {
        console.error("Failed to fetch product by ID:", err);
        return null;
    }
  }, [products]);


  const value = {
    products, // All products, could be useful for some components
    filteredProducts, // Products currently displayed after filters/search
    loading,
    error,
    searchTerm,
    currentCategory,
    sortBy,
    categories: productCategories, // From Data.js
    topSearches: topSearchTerms, // From Data.js
    setSearchTerm, // Allow components to update search term directly (e.g., from URL)
    setCurrentCategory, // Allow components to update category directly
    setSortBy, // Allow components to update sort directly
    searchProducts: handleSearch, // Main function to trigger search/filter
    getProductById,
    refreshProducts: loadProducts, // To manually refresh product list
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);