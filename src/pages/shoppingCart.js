// src/pages/shoppingCart.js (or your chosen path)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Assuming index.css is in src/
import '../shoppingCart.css'; // Styles specific to this page
import { useCart } from '../contexts/CartContext'; // Ensure this path is correct

const CartItem = ({ cartEntry, onQuantityChange, onSelect, onRemove, isSelected }) => {
    const itemData = cartEntry.product || cartEntry.customDesign;

    if (!itemData) {
        console.warn("CartItem: Missing itemData in cartEntry", cartEntry);
        return null;
    }
    const itemId = itemData._id; // Ensure all items (product/custom) have a unique _id

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
                {/* To use the remove button, uncomment it and ensure onRemove is correctly passed */}
                {/* <button onClick={() => onRemove(itemId)} className="remove-item-button">×</button> */}
            </div>
            <div className="item-body">
                <div className="item-visuals-and-price">
                    <img
                        src={itemData.imageUrl || '/images/placeholder-product.png'} // Provide a fallback image
                        alt={itemData.name ? itemData.name.substring(0, 30) : 'Cart item image'}
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

const ActualShoppingCartPage = () => {
    const navigate = useNavigate();
    const {
        cartItems,
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
                // Preserve existing selection if item is already in map, otherwise default to false
                newSelectionMap[itemId] = selectedItemsMap.hasOwnProperty(itemId) ? selectedItemsMap[itemId] : false;
            }
        });
        setSelectedItemsMap(newSelectionMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]); // Only re-run if cartItems changes

    useEffect(() => {
        const newTotal = cartItems.reduce((sum, cartEntry) => {
            const itemData = cartEntry.product || cartEntry.customDesign;
            if (!itemData || typeof itemData.price !== 'number') return sum;
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
            state: { itemsForCheckout: itemsToPassToCheckout, total: totalPriceOfSelected }
        });
    };
    
    // This function is defined but not currently used as the remove button in CartItem is commented out.
    // If you uncomment the button in CartItem, this function will be called via the onRemove prop.
    const handleRemoveItem = (itemId) => {
        removeItemFromCart(itemId);
        // Also update the selectedItemsMap to remove the item if it was selected
        setSelectedItemsMap(prevMap => {
            const { [itemId]: _, ...rest } = prevMap; // efficiently remove property
            return rest;
        });
    };

    return (
        <div className="shopping-cart-page"> {/* Outermost div */}
            <div className="shopping-cart-page-container"> {/* Container for padding/max-width etc. */}
                <main className="shopping-cart-main-content"> {/* Main content block */}
                    <div className="cart-title-section">
                        <h1 className="cart-main-title">Shopping cart</h1>
                        <p className="total-price-display">Total price: ${totalPriceOfSelected.toFixed(2)}</p>
                    </div>

                    {cartItems.length > 0 ? (
                        <div className="cart-items-grid">
                            {cartItems.map(cartEntry => {
                                const itemData = cartEntry.product || cartEntry.customDesign;
                                if (!itemData) return null;
                                const itemId = itemData._id;
                                return (
                                    <CartItem
                                        key={itemId}
                                        cartEntry={cartEntry}
                                        onQuantityChange={updateItemQuantity}
                                        onSelect={handleToggleSelectItem}
                                        onRemove={handleRemoveItem} // Pass the handler here if button is active
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
                </main> {/* Closes shopping-cart-main-content */}
            </div> {/* Closes shopping-cart-page-container */}
        </div> // <<< --- ADD THIS CLOSING DIV TAG
    );
};

export default ActualShoppingCartPage;
