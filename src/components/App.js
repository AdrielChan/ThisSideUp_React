function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">This Side Up</h1>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#design">Design Your Board</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-icons">
        <span role="img" aria-label="search">🔍</span>
        <span role="img" aria-label="user">👤</span>
        <span role="img" aria-label="cart">🛒</span>
      </div>
    </nav>
  );
}

function MainBanner() {
  return (
    <section className="main-banner">
      <div className="banner-content">
        <h2>Custom Skimboards for Every Wave</h2>
        <div className="cta-buttons">
          <button className="btn primary">Shop Now</button>
          <button className="btn secondary">Design Your Board</button>
        </div>
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
      <button className="btn primary">Start Designing</button>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <NavBar />
      <MainBanner />
      <FeaturedCategories />
      <CustomBoardTeaser />
    </div>
  );
}

export default App;
