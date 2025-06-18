// File: src/App.js (or your main router configuration file)
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext'; 
import { DesignProvider } from './contexts/DesignContext'; // Ensure path is correct
import { AuthProvider } from './contexts/AuthContext'; // Ensure path is correct
import { CartProvider } from './contexts/CartContext'; // Ensure path is correct


// Layout components
import Navbar from './components/Navbar'; // Example
import Footer from './components/layout/Footer'; // Example

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/Home')); // Example
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const DesignSkimboardPage = lazy(() => import('./pages/DesignSkimboard'));
const ActualShoppingCartPage = lazy(() => import('./pages/shoppingCart')); // Renamed for clarity
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const SignUpPage = lazy (() => import ('./pages/auth/SignUpPage'));
const SignInPage = lazy (() => import ('./pages/auth/LoginPage'));

function App() {
  return (

      <ProductProvider>
         <AuthProvider> 
          <CartProvider> 
            <DesignProvider>
              <Navbar />
              <Suspense fallback={<div style={{textAlign: 'center', marginTop: '50px', color: 'white'}}>Loading Page...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/products/category/:categoryName" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/design-skimboard" element={<DesignSkimboardPage />} />
                  {/* MODIFIED: /cart now points to your ShoppingCartPage component */}
                  <Route path="/shoppingCart" element={<ActualShoppingCartPage />} /> 
                  <Route path="/checkout" element={<CheckoutPage />} /> {/* This remains for the actual checkout process */}                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<SignInPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  {/* Add other routes here */}
                </Routes>
              </Suspense>
              <Footer />
            </DesignProvider>
           </CartProvider> 
         </AuthProvider> 
      </ProductProvider>

  );
}

export default App;