// Redesigned React App for "This Side Up" E-commerce
import { useState } from "react";
import "./App.css";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">This Side Up</h1>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#design">Design Your Board</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-icons">
        🔍 👤 🛒
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <h2>Custom Skimboards for Every Wave</h2>
      <div className="cta-buttons">
        <button className="primary">Shop Now</button>
        <button className="secondary">Design Your Board</button>
      </div>
    </section>
  );
}

function FeaturedCategories() {
  return (
    <section className="featured-categories">
      <h3>Shop by Category</h3>
      <div className="categories">
        <div className="card">🏄 Skimboards</div>
        <div className="card">🧴 Beach Essentials</div>
        <div className="card">👕 Apparel</div>
      </div>
    </section>
  );
}

function CustomBoardTeaser() {
  return (
    <section className="custom-board">
      <h3>Design Your Own Skimboard</h3>
      <p>Choose colors, add patterns, and preview in real-time.</p>
      <button className="primary">Start Designing</button>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <NavBar />
      <Hero />
      <FeaturedCategories />
      <CustomBoardTeaser />
    </div>
  );
}

export default App;
