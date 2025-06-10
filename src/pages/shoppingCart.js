import React, { useState, useEffect } from 'react';
import '../../index.css'; // <--- ADD THIS LINE (adjust path as needed)
import { initialShoppingCartPageItems } from './Data'; // Import data from Data.js

const CartItem = ({ item, onQuantityChange, onSelect }) => {
  return (
    <div className="cart-item-card">
      <div className="item-header">
        <input
          type="checkbox"
          id={`select-${item._id}`} // Use _id for unique IDs
          checked={item.selected}
          onChange={() => onSelect(item._id)}
          className="custom-checkbox-input" // This class has specific styles in shoppingCart.css
          aria-labelledby={`item-name-${item._id}`}
        />
        <label htmlFor={`select-${item._id}`} className="custom-checkbox-label" aria-hidden="true"></label>
        <p id={`item-name-${item._id}`} className="item-name" title={item.name}>{item.name}</p>
      </div>
      <div className="item-body">
        <div className="item-visuals-and-price">
          <img src={item.imageUrl} alt={item.name.substring(0,30)} className="item-image" />
          <p className="item-price">${item.price.toFixed(2)}</p>
        </div>
        <div className="quantity-selector">
          <button 
            onClick={() => onQuantityChange(item._id, Math.max(1, item.quantity - 1))} 
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={item.quantity <= 1}
          >-</button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => onQuantityChange(item._id, item.quantity + 1)} 
            aria-label={`Increase quantity of ${item.name}`}
          >+</button>
        </div>
      </div>
    </div>
  );
};

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState(initialShoppingCartPageItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotal = cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotal);
  }, [cartItems]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSelectChange = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleCheckout = () => {
    const selectedItemsToCheckout = cartItems.filter(item => item.selected);
    if (selectedItemsToCheckout.length === 0) {
      alert("Please select items to checkout.");
      return;
    }
    const itemsSummary = selectedItemsToCheckout.map(item => `${item.name} (Qty: ${item.quantity})`).join("\n");
    alert(`Checking out with:\n${itemsSummary}\n\nTotal: $${totalPrice.toFixed(2)}`);
    // In a real application, you would navigate to a checkout page or send data to a backend.
  };

  return (
    <div className="shopping-cart-container">
      <header className="cart-page-header">
        <div className="logo">
          <span className="logo-symbol" aria-hidden="true">⚡</span>
          This Side Up
        </div>
        <nav className="nav-links">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-icons">
          {/* Using simple text/emoji for icons for brevity. Replace with SVG or icon library if needed */}
          <a href="#search" aria-label="Search"><span role="img" aria-label="search icon">🔍</span></a>
          <a href="#cart" aria-label="View Cart"><span role="img" aria-label="shopping cart icon">🛒</span></a>
          <a href="#profile" aria-label="User Profile"><span role="img" aria-label="user profile icon">👤</span></a>
        </div>
      </header>

      <main className="shopping-cart-main">
        <div className="cart-title-section">
          <h1 className="cart-main-title">Shopping cart</h1>
          <p className="total-price-display">Total price: ${totalPrice.toFixed(2)}</p>
        </div>

        {cartItems.length > 0 ? (
            <div className="cart-items-grid">
            {cartItems.map(item => (
                <CartItem
                key={item._id} // Use _id as key
                item={item}
                onQuantityChange={handleQuantityChange}
                onSelect={handleSelectChange}
                />
            ))}
            </div>
        ) : (
            <p className="empty-cart-message">Your shopping cart is empty.</p>
        )}


        <div className="checkout-button-container">
          <button className="checkout-button" onClick={handleCheckout} disabled={totalPrice === 0 && cartItems.filter(item => item.selected).length === 0}>
            Check Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCartPage;