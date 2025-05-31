// File: src/App.js
import React, { Suspense, lazy } from 'react'; // Or just React if not using lazy loading yet
import { Routes, Route } from 'react-router-dom';

// Import your Navbar, Footer, PageWrapper (if using them)
import Navbar from './components/Navbar'; // Or './components/layout/Navbar'
// import Footer from './components/layout/Footer';
// import PageWrapper from './components/layout/PageWrapper';

// Import Context Providers
import { AuthProvider } from './contexts/AuthContext'; // If you have it
import { ProductProvider } from './contexts/ProductContext'; // <<<< THIS ONE
import { CartProvider } from './contexts/CartContext';     // If you have it
import { DesignProvider } from './contexts/DesignContext'; // If you have it

// Import Page Components
import Home from './pages/Home';
// Assuming ProductsPage is what you call Products.js in your /pages directory
// If your file is src/pages/Products.js and it's the main product listing page:
import ProductsPage from './pages/Products'; // Use the correct name Products or ProductsPage
// If it's src/pages/products/ProductsPage.js (more structured):
// const ProductsPage = lazy(() => import('./pages/products/ProductsPage'));
// const ProductDetailPage = lazy(() => import('./pages/products/ProductDetailPage'));
// ... other page imports ...
import DesignSkimboard from './pages/DesignSkimboard';
import Search from './pages/Search';
import About from './pages/About';
import FAQ from './pages/FAQ';


// This component renders the actual content within providers
function AppContent() {
  return (
    <>
      <Navbar />
      {/* <PageWrapper>  Optional layout component */}
        {/* <Suspense fallback={<div>Loading Page...</div>}> Optional for lazy loading */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} /> {/* Ensure this uses your Products component */}
            {/* <Route path="/products/category/:categoryName" element={<ProductsPage />} /> */}
            {/* <Route path="/product/:productId" element={<ProductDetailPage />} /> */}
            <Route path="/design" element={<DesignSkimboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            {/* ... other routes ... */}
          </Routes>
        {/* </Suspense> */}
      {/* </PageWrapper> */}
      {/* <Footer /> Optional layout component */}
    </>
  );
}


const App = () => {
  return (
    // Wrap with ALL necessary providers
    // Order might matter if one context depends on another, but usually not for these.
    // <AuthProvider>
      <ProductProvider>  {/* <<<< ENSURE THIS IS PRESENT AND WRAPPING AppContent or Routes */}
        {/* <CartProvider> */}
          {/* <DesignProvider> */}
            <AppContent /> 
          {/* </DesignProvider> */}
        {/* </CartProvider> */}
      </ProductProvider>
    // </AuthProvider>
  );
};

export default App;