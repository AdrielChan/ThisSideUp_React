// File: src/pages/CheckoutPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Assuming you have a CartContext
// import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext for user details

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--color-background-dark, #121212); /* Very dark background */
  color: var(--color-text-light, #FFFFFF);
  padding: var(--spacing-l, 24px) 0; /* Padding top and bottom */
`;

const CheckoutTitle = styled.h1`
  font-family: 'Serif', var(--font-heading, Georgia);
  font-size: var(--font-size-hero-small, 36px); /* Large title */
  color: var(--color-text-light, #FFFFFF);
  text-align: center;
  margin-bottom: var(--spacing-xl, 32px);
`;

const Section = styled.section`
  background-color: var(--color-primary-purple, #5D3FD3); /* Purple background for sections */
  padding: var(--spacing-l, 24px);
  margin: 0 auto var(--spacing-l, 24px) auto; /* Centered with bottom margin */
  max-width: 800px; /* Max width for content sections */
  border-radius: var(--border-radius-m, 8px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-xlarge, 22px);
  font-weight: 600;
  margin-bottom: var(--spacing-m, 16px);
  color: var(--color-text-light, #FFFFFF);
`;

const AddressText = styled.p`
  font-size: var(--font-size-medium, 16px);
  line-height: 1.5;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--spacing-m, 16px);

  th, td {
    text-align: left;
    padding: var(--spacing-s, 8px) var(--spacing-xs, 4px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15); /* Subtle separator */
  }

  th {
    font-size: var(--font-size-small, 14px);
    color: var(--color-neutral-gray-light, #E0E0E0);
    font-weight: 500;
  }
  
  td {
    font-size: var(--font-size-medium, 16px);
  }

  .product-name {
    display: flex;
    align-items: center;
    gap: var(--spacing-s, 8px);
  }

  .product-image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: var(--border-radius-s, 4px);
    background-color: var(--color-neutral-gray, #BDBDBD); /* Placeholder bg */
  }
  
  .product-name-text {
      max-width: 250px; /* Limit width */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }

  .unit-price, .quantity, .total-price {
    text-align: right;
  }
  .quantity {
    text-align: center;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-s, 10px) 0;
  font-size: var(--font-size-large, 18px);
  font-weight: 500;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &.order-total {
    font-weight: bold;
    font-size: var(--font-size-xlarge, 20px);
    color: var(--color-text-light, #FFFFFF); /* Ensure total is prominent */
    margin-top: var(--spacing-s, 8px);
  }
`;

const SelectVoucherButton = styled.button`
  color: var(--color-secondary-peach, #FFDAB9);
  background: none;
  border: none;
  font-size: var(--font-size-medium, 16px);
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-secondary-peach-dark, #FFA07A);
  }
`;

const PaymentMethodSelector = styled.div`
  display: flex;
  gap: var(--spacing-m, 16px);
  margin-top: var(--spacing-s, 8px);
`;

const PaymentButton = styled.button`
  flex-grow: 1;
  padding: var(--spacing-m, 12px);
  border-radius: var(--border-radius-m, 8px);
  font-size: var(--font-size-medium, 16px);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  border: 2px solid transparent;
  
  background-color: ${props => props.active ? 'var(--color-secondary-peach, #FFDAB9)' : 'rgba(255,255,255,0.1)'};
  color: ${props => props.active ? 'var(--color-primary-purple-dark, #4B0082)' : 'var(--color-text-light, #FFFFFF)'};
  border-color: ${props => props.active ? 'var(--color-secondary-peach-dark, #FFA07A)' : 'rgba(255,255,255,0.2)'};


  &:hover:not(:disabled) {
    border-color: ${props => props.active ? 'var(--color-secondary-peach-dark, #FFA07A)' : 'var(--color-secondary-peach, #FFDAB9)'};
    background-color: ${props => props.active ? 'var(--color-secondary-peach-dark, #FFA07A)' : 'rgba(255,218,185,0.2)'};
  }
`;

const FinalSummary = styled.div`
  padding-top: var(--spacing-m, 16px);
  margin-top: var(--spacing-m, 16px);
  border-top: 1px solid rgba(255, 255, 255, 0.15);

  .total-payment {
    font-size: var(--font-size-xxlarge, 28px); /* Larger total payment */
    font-weight: bold;
  }
`;

const PlaceOrderButton = styled.button`
  display: block; /* To allow margin auto for centering if needed, or use flex on parent */
  width: 100%;
  max-width: 300px; /* Max width for the button */
  margin: var(--spacing-xl, 32px) auto 0 auto; /* Centered with top margin */
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-primary-purple-dark, #4B0082); /* Dark text for contrast */
  padding: var(--spacing-m, 16px);
  border: none;
  border-radius: var(--border-radius-m, 8px);
  font-size: var(--font-size-large, 18px);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: var(--color-secondary-peach-dark, #FFA07A);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0px);
  }
  &:disabled {
    background-color: var(--color-neutral-gray, #BDBDBD);
    cursor: not-allowed;
  }
`;


const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  // const { currentUser } = useAuth(); // Assuming this provides { address: '...', ... }

  const [shippingCost, setShippingCost] = useState(1.99); // Example shipping
  const [voucherDiscount, setVoucherDiscount] = useState(0.00);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('PayNow'); // Default
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Mock user data - replace with actual data from AuthContext
  const mockCurrentUser = {
    address: "501A Topaz Road, #08-26 Woodlands Square, Singapore 312501",
    // ... other user details
  };
  const currentUser = mockCurrentUser; // Use mock data for now

  const itemSubtotal = getCartTotal();
  const orderTotal = itemSubtotal + shippingCost;
  const totalPayment = orderTotal - voucherDiscount;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setIsPlacingOrder(true);
    // Simulate API call
    console.log("Placing order with:", {
      userId: currentUser?._id || 'guest', // Handle guest users if applicable
      items: cartItems,
      itemSubtotal,
      shippingCost,
      voucherDiscount,
      totalPayment,
      shippingAddress: currentUser?.address,
      paymentMethod: selectedPaymentMethod,
    });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    
    alert("Order placed successfully!");
    clearCart(); // Clear the cart after successful order
    navigate('/order-confirmation'); // Or to user's order history page
    setIsPlacingOrder(false);
  };

  if (cartItems.length === 0 && !isPlacingOrder) { // Prevent redirect if order was just placed
    // Optional: Redirect to cart or home if cart is empty
    // useEffect(() => { navigate('/cart'); }, [navigate]);
    return (
        <PageWrapper>
            <CheckoutTitle>Checkout</CheckoutTitle>
            <Section style={{ textAlign: 'center' }}>
                <p>Your cart is empty. Add some items to proceed to checkout.</p>
                <PlaceOrderButton style={{maxWidth: '200px', marginTop: '20px'}} onClick={() => navigate('/products')}>Shop Now</PlaceOrderButton>
            </Section>
        </PageWrapper>
    );
  }


  return (
    <PageWrapper>
      <CheckoutTitle>Checkout</CheckoutTitle>

      {/* Delivery Address Section */}
      <Section>
        <SectionTitle>Delivery Address:</SectionTitle>
        <AddressText>{currentUser?.address || "Please set your delivery address."}</AddressText>
        {/* Add a button/link to change address if needed */}
      </Section>

      {/* Products Ordered Section */}
      <Section>
        <SectionTitle>Products Ordered:</SectionTitle>
        <ProductTable>
          <thead>
            <tr>
              <th>Product</th>
              <th className="unit-price">Unit Price</th>
              <th className="quantity">Quantity</th>
              <th className="total-price">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => {
              const product = item.type === 'custom' ? item.customItemData : item.product;
              const itemPrice = product.price;
              return (
                <tr key={item._id}>
                  <td className="product-name">
                    <img 
                        src={product.imageUrl || (item.type === 'custom' ? '/images/custom-skimboard-placeholder.png' : '/images/placeholder-product.png')} 
                        alt={product.name} 
                        className="product-image" 
                    />
                    <span className="product-name-text">{product.name}</span>
                  </td>
                  <td className="unit-price">${itemPrice.toFixed(2)}</td>
                  <td className="quantity">{item.quantity}</td>
                  <td className="total-price">${(itemPrice * item.quantity).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </ProductTable>
        <SummaryRow>
          <span>Item Subtotal:</span>
          <span>${itemSubtotal.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Shipping Option:</span>
          <span>Doorstep Delivery ${shippingCost.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow className="order-total">
          <span>Order Total:</span>
          <span>${orderTotal.toFixed(2)}</span>
        </SummaryRow>
      </Section>

      {/* Vouchers Section */}
      <Section>
        <SummaryRow>
          <SectionTitle style={{ marginBottom: 0 }}>Vouchers:</SectionTitle>
          <SelectVoucherButton onClick={() => alert('Voucher selection UI to be implemented.')}>
            Select Voucher
          </SelectVoucherButton>
        </SummaryRow>
      </Section>

      {/* Payment Method Section */}
      <Section>
        <SectionTitle>Payment Method:</SectionTitle>
        <PaymentMethodSelector>
          <PaymentButton 
            active={selectedPaymentMethod === 'PayNow'}
            onClick={() => setSelectedPaymentMethod('PayNow')}
          >
            PayNow
          </PaymentButton>
          <PaymentButton 
            active={selectedPaymentMethod === 'Card'}
            onClick={() => setSelectedPaymentMethod('Card')}
          >
            Credit Card/Debit Card
          </PaymentButton>
        </PaymentMethodSelector>
        {/* You might add input fields for card details if 'Card' is selected */}
      </Section>

      {/* Final Order Summary Section */}
      <Section>
        <FinalSummary>
          <SummaryRow>
            <span>Item Subtotal</span>
            <span>${itemSubtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping Subtotal</span> {/* Figma calls it Shipping Subtotal here */}
            <span>${shippingCost.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Voucher Discount</span>
            <span>-${voucherDiscount.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow className="total-payment">
            <span>Total Payment</span>
            <span>${totalPayment.toFixed(2)}</span>
          </SummaryRow>
        </FinalSummary>
        <PlaceOrderButton onClick={handlePlaceOrder} disabled={isPlacingOrder}>
          {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
        </PlaceOrderButton>
      </Section>
    </PageWrapper>
  );
};

export default CheckoutPage;