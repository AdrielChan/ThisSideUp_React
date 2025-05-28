// File: src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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