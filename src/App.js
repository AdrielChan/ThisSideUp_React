import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '/pages/Home';
import DesignSkimboard from '/pages/DesignSkimboard';
import Search from '/pages/Search';
import Navbar from '/components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<DesignSkimboard />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
};

export default App;
