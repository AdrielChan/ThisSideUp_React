import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../index.css'; 
import { useCart } from '../contexts/CartContext'; 


// Assuming Data.js is in the same directory as this file or adjust path
// If Data.js is in src/Data.js and this file is src/pages/ShoppingCartPage.js
// then import { initialShoppingCartPageItems } from '../Data'; 
import { initialShoppingCartPageItems } from '../Data'; // Using existing import, ensure path is correct


const CartItem = ({ item, onQuantityChange, onSelect, onRemove }) => { // Added onRemove prop
  return (
    <div className="cart-item-card">
      <div className="item-header">
        <input
          type="checkbox"
          id={`select-${item._id}`}
          checked={item.selected}
          onChange={() => onSelect(item._id)}
          className="custom-checkbox-input"
          aria-labelledby={`item-name-${item._id}`}
        />
        <label htmlFor={`select-${item._id}`} className="custom-checkbox-label" aria-hidden="true"></label>
        <p id={`item-name-${item._id}`} className="item-name" title={item.name}>{item.name}</p>
        <button 
            onClick={() => onRemove(item._id)} 
            className="remove-item-button" 
            aria-label={`Remove ${item.name} from cart`}
        >
          × {/* Simple X for remove */}
        </button>
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


// This component should be in its own file, e.g., src/pages/ShoppingCartPage.js
// and named 'ShoppingCartPage' to match the import in App.js
const ActualShoppingCartPage = () => { 
  const navigate = useNavigate(); // Hook for navigation

  const { 
    cartItems, // Use this instead of cartItemsData
    updateItemQuantity, 
    removeItemFromCart, 
    // getCartTotal, // You might use this for the total of selected items
  } = useCart();

  const [selectedItemsMap, setSelectedItemsMap] = useState({});
  
  // In a real app, cartItems would come from CartContext
  const [cartItemsData, setCartItemsData] = useState(initialShoppingCartPageItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const initialSelection = {};
    cartItems.forEach(item => {
        initialSelection[item.product?._id || item.customDesign?._id] = false; // Default to not selected
    });
    setSelectedItemsMap(initialSelection);
}, [cartItems]);


const handleToggleSelect = (itemId) => {
    setSelectedItemsMap(prevMap => ({
        ...prevMap,
        [itemId]: !prevMap[itemId]
    }));
};

// Recalculate totalPrice based on selectedItemsMap and cartItems from context
useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => {
        const currentItemId = item.product?._id || item.customDesign?._id;
        const price = item.product ? item.product.price : item.customDesign.price;
        if (selectedItemsMap[currentItemId]) {
            return sum + price * item.quantity;
        }
        return sum;
    }, 0);
    setTotalPrice(newTotal);
}, [cartItems, selectedItemsMap]);

  useEffect(() => {
    // This logic should ideally use data from CartContext
    const newTotal = cartItemsData
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotal);
  }, [cartItemsData]);

  const handleQuantityChange = (itemId, newQuantity) => {
    // This should call updateItemQuantity from CartContext
    setCartItemsData(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSelectChange = (itemId) => {
    setCartItemsData(prevItems =>
      prevItems.map(item =>
        item._id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    // This should call removeItemFromCart from CartContext
    setCartItemsData(prevItems => prevItems.filter(item => item._id !== itemId));
  };

  const handleActualCheckout = () => {
    const selectedItemsToCheckout = cartItemsData.filter(item => item.selected);
    if (selectedItemsToCheckout.length === 0) {
      alert("Please select items to checkout.");
      return;
    }
    // Logic to prepare selected items for checkout (e.g., pass to CheckoutPage via state or context)
    console.log("Proceeding to checkout with:", selectedItemsToCheckout);
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <div className="shopping-cart-container">
      {/* Remove this header if you have a global Navbar */}
      {/* <header className="cart-page-header"> ... </header> */}

      <main className="shopping-cart-main">
        <div className="cart-title-section">
          <h1 className="cart-main-title">Shopping cart</h1>
          {/* Total price should reflect only SELECTED items */}
          <p className="total-price-display">Total for selected: ${totalPrice.toFixed(2)}</p>
        </div>

        {cartItemsData.length > 0 ? (
            <div className="cart-items-grid">
            {cartItemsData.map(item => (
                <CartItem
                key={item._id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onSelect={handleSelectChange}
                onRemove={handleRemoveItem} // Pass remove handler
                />
            ))}
            </div>
        ) : (
            <p className="empty-cart-message">Your shopping cart is empty. <a href="/products">Continue Shopping</a></p>
        )}


        <div className="checkout-button-container">
          {/* MODIFIED: Button now navigates to /checkout */}
          <button 
            className="checkout-button" 
            onClick={handleActualCheckout} 
            disabled={cartItemsData.filter(item => item.selected).length === 0}
          >
            Check Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default ActualShoppingCartPage; // Ensure export name matches import in App.js