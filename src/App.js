// File: src/App.js

// DON'T FORGET, IN YOUR 🫵 TERMINAL:  npm install react-router-dom
//               AND                    npm i styled-components

import React from 'react';
// BrowserRouter is typically in index.js. You only need Routes, Route, Navigate here.
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DesignSkimboard from './pages/DesignSkimboard';
import Search from './pages/Search'; // This should ideally be SearchResultsPage
import About from './pages/About';   // Should be AboutPage for consistency
import Products from './pages/Products'; // Should be ProductsPage
import FAQ from './pages/FAQ';       // Should be FAQPage
import Navbar from './components/Navbar';
// import NotFoundPage from './pages/NotFoundPage'; // Example for a 404 page

const App = () => {
  return (
    <> {/* React Fragment, can also be <React.Fragment> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<DesignSkimboard />} />
        <Route path="/search" element={<Search />} /> {/* Or a path like /search-results */}
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Example of using Navigate for a catch-all route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* Or redirect to home if page not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;