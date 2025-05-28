
// DON'T FORGET, IN YOUR 🫵 TERMINAL:  npm install react-router-dom
//               AND                    npm i styled-components

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import DesignSkimboard from './pages/DesignSkimboard';
import Search from './pages/Search';
import About from './pages/About';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<DesignSkimboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </>
  );
};

export default App;
