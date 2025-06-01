// File: src/App.js (or your main router configuration file)
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext'; // Ensure path is correct
// Import other necessary contexts (e.g., CartProvider, AuthProvider)

// Layout components
import Navbar from './components/Navbar'; // Example
import Footer from './components/layout/Footer'; // Example

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/Home')); // Example
const Products = lazy(() => import('./pages/Products'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
// ... other page imports

function App() {
  return (

      <ProductProvider> {/* ProductContext wraps routes that need product data */}
        {/* <AuthProvider> */}
          {/* <CartProvider> */}
            <Navbar />
            <Suspense fallback={<div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Loading Page...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/category/:categoryName" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Route for product detail */}
                {/* Add other routes here */}
              </Routes>
            </Suspense>
            <Footer />
          {/* </CartProvider> */}
        {/* </AuthProvider> */}
      </ProductProvider>

  );
}

export default App;