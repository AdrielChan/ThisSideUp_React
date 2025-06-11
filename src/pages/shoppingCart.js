// File: src/pages/shoppingCart.js (or wherever ActualShoppingCartPage is located)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Global styles (ensure path is correct if this file is not in src/pages)
import '../shoppingCart.css'; // Component-specific styles (MUST be in the same directory or path updated)
import { useCart } from '../contexts/CartContext'; // Crucial import for live cart data

// CartItem component: Renders individual items from the cart.
const CartItem = ({ cartEntry, onQuantityChange, onSelect, onRemove, isSelected }) => {
    const itemData = cartEntry.product || cartEntry.customDesign;

    if (!itemData) {
        console.warn("CartItem received an entry without product or customDesign data:", cartEntry);
        return null;
    }
    const itemId = itemData._id;

    return (
        <div className="cart-item-card">
            <div className="item-header">
                <input
                    type="checkbox"
                    id={`select-${itemId}`}
                    checked={isSelected}
                    onChange={() => onSelect(itemId)}
                    className="custom-checkbox-input"
                    aria-labelledby={`item-name-${itemId}`}
                />
                <label htmlFor={`select-${itemId}`} className="custom-checkbox-label" aria-hidden="true"></label>
                <p id={`item-name-${itemId}`} className="item-name" title={itemData.name}>
                    {itemData.name}
                </p>
                <button
                    onClick={() => onRemove(itemId)}
                    className="remove-item-button"
                    aria-label={`Remove ${itemData.name} from cart`}
                >
                    ×
                </button>
            </div>
            <div className="item-body">
                <div className="item-visuals-and-price">
                    <img
                        src={itemData.imageUrl || '/placeholder-image.png'} // Ensure you have a fallback
                        alt={itemData.name ? itemData.name.substring(0, 30) : 'Cart item'}
                        className="item-image"
                    />
                    <p className="item-price">${itemData.price ? itemData.price.toFixed(2) : '0.00'}</p>
                </div>
                <div className="quantity-selector">
                    <button
                        onClick={() => onQuantityChange(itemId, Math.max(1, cartEntry.quantity - 1))}
                        aria-label={`Decrease quantity of ${itemData.name}`}
                        disabled={cartEntry.quantity <= 1}
                    >-</button>
                    <span>{cartEntry.quantity}</span>
                    <button
                        onClick={() => onQuantityChange(itemId, cartEntry.quantity + 1)}
                        aria-label={`Increase quantity of ${itemData.name}`}
                    >+</button>
                </div>
            </div>
        </div>
    );
};

// Main Shopping Cart Page Component
const ActualShoppingCartPage = () => {
    const navigate = useNavigate();
    const {
        cartItems,          // Live cart array from CartContext
        updateItemQuantity,
        removeItemFromCart,
    } = useCart();

    const [selectedItemsMap, setSelectedItemsMap] = useState({});
    const [totalPriceOfSelected, setTotalPriceOfSelected] = useState(0);

    useEffect(() => {
        const newSelectionMap = {};
        cartItems.forEach(cartEntry => {
            const itemId = cartEntry.product?._id || cartEntry.customDesign?._id;
            if (itemId) {
                newSelectionMap[itemId] = selectedItemsMap[itemId] || false; // Preserve selection or default to false
            }
        });
        setSelectedItemsMap(newSelectionMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]); // Re-initialize selection map if cartItems from context changes

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, cartEntry) => {
            const itemData = cartEntry.product || cartEntry.customDesign;
            if (!itemData || !itemData.price) return sum;

            const itemId = itemData._id;
            if (selectedItemsMap[itemId]) {
                return sum + (itemData.price * cartEntry.quantity);
            }
            return sum;
        }, 0);
        setTotalPriceOfSelected(newTotal);
    }, [cartItems, selectedItemsMap]);

    const handleToggleSelectItem = (itemIdToToggle) => {
        setSelectedItemsMap(prevMap => ({
            ...prevMap,
            [itemIdToToggle]: !prevMap[itemIdToToggle],
        }));
    };

    const handleActualCheckout = () => {
        const itemsToPassToCheckout = cartItems.filter(cartEntry => {
            const itemId = cartEntry.product?._id || cartEntry.customDesign?._id;
            return itemId && selectedItemsMap[itemId];
        });

        if (itemsToPassToCheckout.length === 0) {
            alert("Please select items to checkout.");
            return;
        }

        navigate('/checkout', {
            state: {
                itemsForCheckout: itemsToPassToCheckout,
                total: totalPriceOfSelected,
            }
        });
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        updateItemQuantity(itemId, newQuantity); // Call context function
    };

    const handleRemoveItem = (itemId) => {
        removeItemFromCart(itemId); // Call context function
        setSelectedItemsMap(prevMap => {
            const { [itemId]: _, ...restOfMap } = prevMap;
            return restOfMap;
        });
    };

    return (
        <div className="shopping-cart-container"> {/* This class needs styles from shoppingCart.css */}
            <main className="shopping-cart-main">
                <div className="cart-title-section">
                    <h1 className="cart-main-title">Shopping cart</h1>
                    <p className="total-price-display">Total price: ${totalPriceOfSelected.toFixed(2)}</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="cart-items-grid">
                        {cartItems.map(cartEntry => { // Use cartItems from CartContext
                            const itemData = cartEntry.product || cartEntry.customDesign;
                            if (!itemData) return null;
                            const itemId = itemData._id;

                            return (
                                <CartItem
                                    key={itemId}
                                    cartEntry={cartEntry}
                                    onQuantityChange={handleQuantityChange}
                                    onSelect={handleToggleSelectItem}
                                    onRemove={handleRemoveItem}
                                    isSelected={!!selectedItemsMap[itemId]}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p className="empty-cart-message">
                        Your shopping cart is empty. <a href="/products">Continue Shopping</a>
                    </p>
                )}

                <div className="checkout-button-container">
                    <button
                        className="checkout-button"
                        onClick={handleActualCheckout}
                        disabled={cartItems.length === 0 || Object.values(selectedItemsMap).every(isSelected => !isSelected)}
                    >
                        Check Out
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ActualShoppingCartPage;