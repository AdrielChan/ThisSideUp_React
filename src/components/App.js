function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">This Side Up</h1>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#shop">Shop</a>
        <a href="#design">Design Your Board</a>
        <a href="#about">About</a>
        <a href="#contact">Contacts</a>
      </div>
    </nav>
  );
}

function MainBanner() {
  return (
    <section className="main-banner">
      <h2>Customize a skimboard!</h2>
      <div className="cta-buttons">
        <button className="btn primary">Shop now</button>
        <button className="btn primary">Design your board</button>
      </div>
    </section>
  );
}

function FeaturedCategories() {
  return (
    <section className="featured-categories">
      <h3>Shop by category</h3>
      <div className="categories">
        <button className="category-btn">Skimboards</button>
        <button className="category-btn">Beach essentials</button>
        <button className="category-btn">Apparel</button>
      </div>
    </section>
  );
}

function CustomBoardTeaser() {
  return (
    <section className="custom-board">
      <h3>Design your own skimboard</h3>
      <p>Choose a color, add patterns and preview in real time!</p>
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
