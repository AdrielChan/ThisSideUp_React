// File: src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { DesignProvider } from './contexts/DesignContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageWrapper from './components/layout/PageWrapper';
import LoadingSpinner from './components/common/LoadingSpinner'; // Create a simple spinner

// Eagerly load common/core pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load other pages
const ProductsPage = lazy(() => import('./pages/products/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/products/ProductDetailPage'));
const SearchResultsPage = lazy(() => import('./pages/products/SearchResultsPage'));
const DesignSkimboardPage = lazy(() => import('./pages/design/DesignSkimboardPage'));
const CartPage = lazy(() => import('./pages/cart/CartPage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));
const OrderStatusPage = lazy(() => import('./pages/OrderStatusPage')); // Placeholder
const OrderConfirmationPage = lazy(() => import('./pages/checkout/OrderConfirmationPage'));


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner />; // Or some other loading indicator
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


function AppContent() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/category/:categoryName" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} /> 
            
            <Route path="/design-skimboard" element={<DesignSkimboardPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Protected Routes */}
            <Route 
              path="/checkout" 
              element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} 
            />
            <Route 
              path="/order-status" 
              element={<ProtectedRoute><OrderStatusPage /></ProtectedRoute>} 
            />
             <Route 
              path="/order-confirmation/:orderId" 
              element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} 
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageWrapper>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <DesignProvider> {/* DesignContext wraps routes that might use it */}
            <AppContent />
          </DesignProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;