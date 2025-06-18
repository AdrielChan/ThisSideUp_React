// File: src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom'; // Added Router
import { ProductProvider } from './contexts/ProductContext'; 
import { DesignProvider } from './contexts/DesignContext';
import { AuthProvider } from './contexts/AuthContext'; 
import { CartProvider } from './contexts/CartContext'; 

// Layout components
import Navbar from './components/Navbar'; 
import Footer from './components/layout/Footer'; 

// Lazy load pages
const HomePage = lazy(() => import('./pages/Home'));
const ProductsPage = lazy(() => import('./pages/Products')); // Renamed for consistency
const AboutPage = lazy(() => import('./pages/About')); // Renamed for consistency
const FAQPage = lazy(() => import('./pages/FAQ')); // Renamed for consistency
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const DesignSkimboardPage = lazy(() => import('./pages/DesignSkimboard'));
const ActualShoppingCartPage = lazy(() => import('./pages/shoppingCart'));
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const SignUpPage = lazy (() => import ('./pages/auth/SignUpPage')); // Correct path as per your App.js
const SignInPage = lazy (() => import ('./pages/auth/LoginPage'));   // Correct path as per your App.js
const UserProfilePage = lazy(() => import('./pages/auth/UserProfile')); // Example for My Profile link

function App() {
  return (    
      <AuthProvider> 
        <ProductProvider>
          <CartProvider> 
            <DesignProvider>
              <Navbar />
              <Suspense fallback={<div style={{textAlign: 'center', marginTop: '50px', color: 'black'}}>Loading Page...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/products/category/:categoryName" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/design-skimboard" element={<DesignSkimboardPage />} />
                  <Route path="/shoppingCart" element={<ActualShoppingCartPage />} /> 
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<SignInPage />} />
                  <Route path="/signin" element={<SignInPage />} /> {/* Keep for compatibility if used */}
                  <Route path="/profile" element={<UserProfilePage />} /> {/* Example for My Profile */}
                  {/* Add other routes here */}
                  <Route path="*" element={<div style={{textAlign: 'center', marginTop: '50px', color: 'black'}}>Page Not Found</div>} /> {/* Basic 404 */}
                </Routes>
              </Suspense>
              <Footer />
            </DesignProvider>
           </CartProvider> 
         </ProductProvider> 
       </AuthProvider>
  );
}


export default App;