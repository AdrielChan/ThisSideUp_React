// File: src/App.js

import React, { Suspense, lazy } from 'react'; // Keep these imports
import { Routes, Route } from 'react-router-dom';

// --- Your existing imports for Navbar and eager-loaded pages ---
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import ProductsPage from './pages/Products'; // Eagerly loaded example

// --- CONTEXT PROVIDERS ---
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { DesignProvider } from './contexts/DesignContext';

// --- LAZY LOADED PAGE COMPONENTS ---
const ProductsPage = lazy(() => import('./pages/Products'));
const DesignSkimboardPage = lazy(() => import('./pages/DesignSkimboard'));
const AboutPage = lazy(() => import('./pages/About'));
const FAQPage = lazy(() => import('./pages/FAQ'));
const SearchPage = lazy(() => import('./pages/Search'));
// const ProductDetailPage = lazy(() => import('./pages/products/ProductDetailPage'));
// const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
// const CartPage = lazy(() => import('./pages/cart/CartPage'));



// --- Optional: A simple loading component for Suspense fallback ---
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 70px)', background: 'var(--color-background-dark)' }}>
    <p style={{ color: 'var(--color-text-light)' }}>Loading Page...</p>
  </div>
);

// --- AppContent to hold the structure within providers ---
function AppContent() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/category/:categoryName" element={<ProductsPage />} />
          <Route path="/design" element={<DesignSkimboardPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          {/* <Route path="/product/:productId" element={<ProductDetailPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/cart" element={<CartPage />} /> */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}

// --- Main App Component ---
const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <DesignProvider>
            <AppContent />
          </DesignProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
