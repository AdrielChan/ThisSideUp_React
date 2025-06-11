import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Global styles
import { useCart } from '../contexts/CartContext'; // Crucial import for live cart data

// CartItem component: Renders individual items from the cart.
// It receives the full cart entry (item) which includes quantity and product/customDesign details.
// It also receives handlers for quantity changes, selection, and removal.
const CartItem = ({ cartEntry, onQuantityChange, onSelect, onRemove, isSelected }) => {
    // Determine the actual item details (product or custom design)
    const itemData = cartEntry.product || cartEntry.customDesign;

    // If itemData is somehow undefined (shouldn't happen with proper CartContext structure), don't render.
    if (!itemData) {
        console.warn("CartItem received an entry without product or customDesign data:", cartEntry);
        return null;
    }

    const itemId = itemData._id; // Unique ID of the product or custom design

    return (
        <div className="cart-item-card">
            <div className="item-header">
                <input
                    type="checkbox"
                    id={`select-${itemId}`}
                    checked={isSelected} // Controlled by isSelected prop
                    onChange={() => onSelect(itemId)} // Calls parent handler to update selection map
                    className="custom-checkbox-input"
                    aria-labelledby={`item-name-${itemId}`}
                />
                <label htmlFor={`select-${itemId}`} className="custom-checkbox-label" aria-hidden="true"></label>
                <p id={`item-name-${itemId}`} className="item-name" title={itemData.name}>
                    {itemData.name}
                </p>
                <button
                    onClick={() => onRemove(itemId)} // Calls parent handler to remove item
                    className="remove-item-button"
                    aria-label={`Remove ${itemData.name} from cart`}
                >
                    × {/* Simple X for remove icon */}
                </button>
            </div>
            <div className="item-body">
                <div className="item-visuals-and-price">
                    <img
                        src={itemData.imageUrl || '/placeholder-image.png'} // Provide a fallback image path
                        alt={itemData.name.substring(0, 30)}
                        className="item-image"
                    />
                    <p className="item-price">${itemData.price.toFixed(2)}</p>
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
        cartItems,          // THIS IS THE LIVE CART ARRAY from CartContext
        updateItemQuantity, // Function to update quantity in CartContext
        removeItemFromCart, // Function to remove item from CartContext
    } = useCart();

    // Local state for managing which items are *selected* for checkout on this page
    const [selectedItemsMap, setSelectedItemsMap] = useState({});
    // Local state for the total price of *selected* items
    const [totalPriceOfSelected, setTotalPriceOfSelected] = useState(0);

    // Effect to initialize or update the local `selectedItemsMap` when `cartItems` from context change.
    // This ensures that new items added to the cart get an entry in the selection map (defaulting to not selected),
    // and items removed from the cart are implicitly removed from selection consideration.
    useEffect(() => {
        const newSelectionMap = {};
        cartItems.forEach(cartEntry => {
            const itemId = cartEntry.product?._id || cartEntry.customDesign?._id;
            if (itemId) {
                // Preserve existing selection status if item is still in map, otherwise default to false (not selected)
                newSelectionMap[itemId] = selectedItemsMap[itemId] || false;
            }
        });
        setSelectedItemsMap(newSelectionMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [cartItems]); // Dependency: cartItems from context. IMPORTANT: Do not add selectedItemsMap here to avoid infinite loop.

    // Effect to recalculate the `totalPriceOfSelected` whenever the `cartItems` (from context)
    // or the local `selectedItemsMap` changes.
    useEffect(() => {
        const newTotal = cartItems.reduce((sum, cartEntry) => {
            const itemData = cartEntry.product || cartEntry.customDesign;
            if (!itemData) return sum; // Safety check

            const itemId = itemData._id;
            if (selectedItemsMap[itemId]) { // Check if the item is marked as selected in our local map
                return sum + (itemData.price * cartEntry.quantity);
            }
            return sum;
        }, 0);
        setTotalPriceOfSelected(newTotal);
    }, [cartItems, selectedItemsMap]); // Dependencies: cartItems from context and local selectedItemsMap

    // Handler to toggle the selection status of an item in the local `selectedItemsMap`
    const handleToggleSelectItem = (itemIdToToggle) => {
        setSelectedItemsMap(prevMap => ({
            ...prevMap,
            [itemIdToToggle]: !prevMap[itemIdToToggle], // Toggle the boolean value
        }));
    };

    // Handler for proceeding to checkout
    const handleActualCheckout = () => {
        // Filter the `cartItems` from context to get only those marked as selected in `selectedItemsMap`
        const itemsToPassToCheckout = cartItems.filter(cartEntry => {
            const itemId = cartEntry.product?._id || cartEntry.customDesign?._id;
            return itemId && selectedItemsMap[itemId]; // Item must have an ID and be selected
        });

        if (itemsToPassToCheckout.length === 0) {
            alert("Please select items to checkout.");
            return;
        }

        // Navigate to the checkout page, passing the selected items and their total price
        // The CheckoutPage will then use this data.
        navigate('/checkout', {
            state: {
                itemsForCheckout: itemsToPassToCheckout,
                total: totalPriceOfSelected, // Pass the already calculated total of selected items
            }
        });
    };

    // Wrapper for CartContext's updateItemQuantity
    const handleQuantityChange = (itemId, newQuantity) => {
        updateItemQuantity(itemId, newQuantity);
    };

    // Wrapper for CartContext's removeItemFromCart
    const handleRemoveItem = (itemId) => {
        removeItemFromCart(itemId);
        // Also, update the local selection map to remove the item if it was there
        // This prevents issues if the item is re-added later.
        setSelectedItemsMap(prevMap => {
            const { [itemId]: _, ...restOfMap } = prevMap; // Destructure to remove the item
            return restOfMap;
        });
    };

    return (
        <div className="shopping-cart-container">
            <main className="shopping-cart-main">
                <div className="cart-title-section">
                    <h1 className="cart-main-title">Shopping cart</h1>
                    {/* Display the total price of only the items currently selected */}
                    <p className="total-price-display">Total price: ${totalPriceOfSelected.toFixed(2)}</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="cart-items-grid">
                        {cartItems.map(cartEntry => { // Iterate over cartItems from CartContext
                            const itemData = cartEntry.product || cartEntry.customDesign;
                            if (!itemData) return null; // Should not occur
                            const itemId = itemData._id;

                            return (
                                <CartItem
                                    key={itemId} // IMPORTANT: Key should be stable and unique (product/customDesign ID)
                                    cartEntry={cartEntry} // Pass the entire cart entry
                                    onQuantityChange={handleQuantityChange}
                                    onSelect={handleToggleSelectItem} // Use the toggle handler
                                    onRemove={handleRemoveItem}
                                    isSelected={!!selectedItemsMap[itemId]} // Pass current selection status
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
                        // Disable button if no items are in the cart OR if no items are selected
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