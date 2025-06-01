// File: src/App.js (or your main router configuration file)
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext'; 
import { DesignProvider } from './contexts/DesignContext'; // Ensure path is correct
// Import other necessary contexts (e.g., CartProvider, AuthProvider)

// Layout components
import Navbar from './components/Navbar'; // Example
import Footer from './components/layout/Footer'; // Example

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/Home')); // Example
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const DesignSkimboardPage = lazy(() => import('./pages/DesignSkimboard')); // New design page
// ... other page imports

function App() {
  return (

      <ProductProvider> {/* ProductContext wraps routes that need product data */}
        {/* <AuthProvider> */}
          {/* <CartProvider> */}
            <DesignProvider>
              <Navbar />
              <Suspense fallback={<div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Loading Page...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/products/category/:categoryName" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Route for product detail */}
                  <Route path="/design-skimboard" element={<DesignSkimboardPage />} /> {/* Route for design page */}
                  {/* Add other routes here */}
                </Routes>
              </Suspense>
              <Footer />
            </DesignProvider>
          {/* </CartProvider> */}
        {/* </AuthProvider> */}
      </ProductProvider>

  );
}

export default App;