// File: src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaShareAlt,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import ProductCard from './ProductCard';
import { useProducts } from '../contexts/ProductContext'; 

// --- STYLED COMPONENTS ---
// These components define the visual appearance of the page elements.

// PageWrapper: The main container for the entire product detail page.
// It sets the dark background color, text color, and minimum height.
const PageWrapper = styled.div`
  background-color: var(--color-background-dark, #121212); /* Very dark background */
  color: var(--color-text-light, #FFFFFF);
  min-height: 100vh;
  padding: var(--spacing-m, 16px) var(--spacing-l, 24px) var(--spacing-xl, 32px);
  font-family: var(--font-body, 'Arial', sans-serif);
`;

// BackButton: Styles the back arrow button for navigation.
const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-light, #FFFFFF);
  font-size: var(--font-size-xlarge, 24px); /* Larger icon */
  cursor: pointer;
  margin-bottom: var(--spacing-m, 16px);
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-secondary-peach, #FFDAB9);
  }
`;

// ProductContentWrapper: A container for the main product information (image and details).
// It uses a purple background and flexbox for a two-column layout.
const ProductContentWrapper = styled.div`
  background-color: var(--color-primary-purple, #5D3FD3); /* Purple background */
  padding: var(--spacing-xl, 32px);
  border-radius: var(--border-radius-l, 12px);
  display: flex;
  gap: var(--spacing-xl, 32px);
  margin-bottom: var(--spacing-xxl, 48px);

  @media (max-width: 768px) { // Responsive: stacks columns on smaller screens
    flex-direction: column;
    padding: var(--spacing-l, 24px);
  }
`;

// ImageColumn: The left column containing the product image and social action buttons.
const ImageColumn = styled.div`
  flex: 0 0 40%; /* Takes up 40% of the width, doesn't grow or shrink excessively */
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1; /* Takes full width when stacked */
  }
`;

// Rename ProductImage to MainProductImage since that's what we use in the component
const MainProductImage = styled.img`
  width: 100%;
  max-width: 350px; /* Max width for the image */
  height: auto;
  object-fit: contain;
  background-color: white; /* Background for the image container itself */
  border-radius: var(--border-radius-m, 8px);
  margin-bottom: var(--spacing-l, 24px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
`;

// SocialActions: Container for the "Share" and "Likes" buttons.
const SocialActions = styled.div`
  display: flex;
  justify-content: space-around; /* Spreads out Share and Likes */
  width: 100%;
  max-width: 350px;
  margin-top: var(--spacing-m, 16px);
`;

// BaseSocialButton: A common base for Share and Like buttons.
const BaseSocialButton = styled.button`
  background-color: var(--color-secondary-peach, #FFDAB9);
  color: var(--color-primary-purple-dark, #4B0082); /* Dark text for contrast */
  border: none;
  border-radius: var(--border-radius-m, 8px);
  padding: var(--spacing-s, 10px) var(--spacing-m, 16px);
  font-size: var(--font-size-medium, 16px);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-secondary-peach-dark, #FFA07A);
  }

  svg {
    font-size: var(--font-size-large, 18px);
  }
`;

// DetailsColumn: The right column containing product name, price, description, etc.
const DetailsColumn = styled.div`
  flex: 1; /* Takes remaining space */
  color: var(--color-text-light, #FFFFFF);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s, 10px); /* Spacing between detail items */
`;

// ProductName: Styles the product's name.
const ProductName = styled.h1`
  font-size: var(--font-size-xxlarge, 28px);
  font-weight: bold;
  margin-bottom: var(--spacing-xs, 4px);
  font-family: var(--font-heading, 'Georgia', serif);
`;

// ProductPrice: Styles the product's price.
const ProductPrice = styled.p`
  font-size: var(--font-size-xlarge, 22px);
  color: var(--color-secondary-peach, #FFDAB9); /* Peach color for price */
  font-weight: 600;
  margin-bottom: var(--spacing-s, 8px);
`;

// RatingContainer: Holds the star icons and rating text.
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
  margin-bottom: var(--spacing-m, 16px);
  font-size: var(--font-size-medium, 16px);

  svg {
    color: #FFD700; /* Gold color for stars */
  }
`;

// ProductDescription: Styles the product description text.
const ProductDescription = styled.p`
  font-size: var(--font-size-small, 14px);
  line-height: 1.6;
  color: var(--color-neutral-gray-light, #E0E0E0); /* Lighter text for description */
  margin-bottom: var(--spacing-m, 16px);
`;

// InfoRow: A row for displaying structured info like "Bundle Deals", "Shipping".
const InfoRow = styled.div`
  display: flex;
  align-items: flex-start; /* Align items to the start if text wraps */
  gap: var(--spacing-m, 16px);
  margin-bottom: var(--spacing-s, 10px);
  font-size: var(--font-size-medium, 16px);
`;

// InfoLabel: Styles the label part (e.g., "Shipping:").
const InfoLabel = styled.span`
  font-weight: 600;
  color: var(--color-text-light, #FFFFFF);
  min-width: 130px; /* Ensures alignment */
`;

// InfoValue: Styles the value part (e.g., "Within 1 Week...").
const InfoValue = styled.span`
  color: var(--color-neutral-gray-light, #E0E0E0);
  .highlight { /* For highlighting parts like shipping fee */
    color: var(--color-secondary-peach, #FFDAB9);
    font-weight: 600;
  }
`;

// QuantityControl: Container for the quantity adjuster.
const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-s, 12px);
  margin: var(--spacing-m, 16px) 0;
`;

// QuantityButton: Styles the "+" and "-" buttons for quantity.
const QuantityButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--color-text-light, #FFFFFF);
  border: none;
  border-radius: var(--border-radius-s, 4px);
  width: 30px;
  height: 30px;
  font-size: var(--font-size-large, 18px);
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// QuantityDisplay: Shows the current quantity number.
const QuantityDisplay = styled.span`
  font-size: var(--font-size-large, 18px);
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

// ActionButtonsContainer: Holds "Add to cart" and "Buy Now" buttons.
const ActionButtonsContainer = styled.div`
  display: flex;
  gap: var(--spacing-m, 16px);
  margin-top: var(--spacing-l, 24px);

  @media (max-width: 480px) { // Stacks buttons on very small screens
    flex-direction: column;
  }
`;

// BaseActionButton: Common styles for action buttons.
const BaseActionButton = styled.button`
  flex-grow: 1; /* Buttons share space equally */
  padding: var(--spacing-m, 14px);
  border: none;
  border-radius: var(--border-radius-m, 8px);
  font-size: var(--font-size-medium, 16px);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-s, 8px);

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

// AddToCartButton: Specific style for the "Add to cart" button.
const AddToCartButton = styled(BaseActionButton)`
  background-color: var(--color-primary-purple-dark, #4B0082); /* Darker purple */
  color: var(--color-text-light, #FFFFFF);

  &:hover {
    background-color: var(--color-primary-purple-darker, #3A006A); /* Even darker on hover */
  }
`;

// BuyNowButton: Specific style for the "Buy Now" button.
const BuyNowButton = styled(BaseActionButton)`
  background-color: var(--color-neutral-gray-light, #E0E0E0);
  color: var(--color-primary-purple-dark, #4B0082); /* Dark text for contrast */

  &:hover {
    background-color: var(--color-neutral-gray, #BDBDBD);
  }
`;

// SimilarProductsSection: Container for the "Similar Products" area.
const SimilarProductsSection = styled.section`
  margin-top: var(--spacing-xxl, 48px);
  padding: var(--spacing-l, 24px) 0; /* Padding only top/bottom */
`;

// SimilarProductsTitle: Title for the "Similar Products" section.
const SimilarProductsTitle = styled.h2`
  font-size: var(--font-size-xlarge, 24px);
  font-weight: 600;
  margin-bottom: var(--spacing-l, 24px);
  color: var(--color-text-light, #FFFFFF);
  font-family: var(--font-heading, 'Georgia', serif);
`;

// SimilarProductsGrid: A scrollable grid for similar product cards.
const SimilarProductsGrid = styled.div`
  display: flex;
  gap: var(--spacing-l, 24px);
  overflow-x: auto; /* Enables horizontal scrolling */
  padding-bottom: var(--spacing-m, 16px); /* Space for scrollbar if needed */

  /* Hide scrollbar for a cleaner look, but still scrollable */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

// SimilarProductCard: Styles a single card for a similar product.
// (Normally this would be a separate component, but kept here due to the 1-file constraint)
const SimilarProductCard = styled.div`
  background-color: var(--color-surface-gray, #2a2a2a); /* Slightly lighter than page bg */
  border-radius: var(--border-radius-m, 8px);
  padding: var(--spacing-m, 16px);
  min-width: 200px; /* Minimum width for each card */
  max-width: 220px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  }
`;

const SimilarProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain; /* Changed to contain for better product visibility */
  background-color: white; /* White background for the image part */
  border-radius: var(--border-radius-s, 4px);
  margin-bottom: var(--spacing-s, 12px);
`;

const SimilarProductName = styled.h3`
  font-size: var(--font-size-medium, 16px);
  font-weight: 500;
  color: var(--color-text-light, #FFFFFF);
  margin-bottom: var(--spacing-xs, 6px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SimilarProductPrice = styled.p`
  font-size: var(--font-size-medium, 16px);
  font-weight: 600;
  color: var(--color-secondary-peach, #FFDAB9);
`;


// --- REACT COMPONENT ---
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useCart();
  const { getProductById, filteredProducts, loading: contextLoading, error: contextError } = useProducts();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const loadProductDetails = async () => {
      if (!id) {
        setError("No product ID provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          
          // Find similar products from the same category
          if (filteredProducts && filteredProducts.length > 0) {
            const related = filteredProducts
              .filter(p => p.category === fetchedProduct.category && p._id !== fetchedProduct._id)
              .slice(0, 5); // Get up to 5 similar products
            setSimilarProducts(related);
          }
        } else {
          setError(`Product with ID ${id} not found.`);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message || "An error occurred while fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id, getProductById, filteredProducts]);

  const handleIncrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  const handleAddToCart = () => {
    if (product) {
      if (cart?.addItemToCart) {
        cart.addItemToCart(product._id, quantity);
        console.log(`Added ${quantity} of ${product.name} to cart.`);
      } else {
        setCartMessage('Cart functionality is currently unavailable.');
        setTimeout(() => setCartMessage(''), 3000);
      }
    }
  };

  const handleBuyNow = () => {
    if (product) {
      if (cart?.addItemToCart) {
        cart.addItemToCart(product._id, quantity);
        navigate('/checkout');
      } else {
        setCartMessage('Cart functionality is currently unavailable.');
        setTimeout(() => setCartMessage(''), 3000);
      }
    }
  };

  const handleLike = () => {
    if (product) {
      // Placeholder for like functionality
      alert(`You liked ${product.name}!`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Share feature not supported by your browser');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={`star-${i}`} 
          style={{ opacity: i < Math.round(rating) ? 1 : 0.3 }}
        />
      );
    }
    return stars;
  };

  if (loading || contextLoading) {
    return <PageWrapper><p>Loading product details...</p></PageWrapper>;
  }

  if (error || contextError) {
    return <PageWrapper><p>Error: {error || contextError}</p></PageWrapper>;
  }

  if (!product) {
    return <PageWrapper><p>Product not found.</p></PageWrapper>;
  }

  return (
    <PageWrapper>
      {/* Back Button */}
      <BackButton onClick={() => navigate(-1)}> {/* navigate(-1) goes to previous page */}
        <FaArrowLeft />
      </BackButton>

      {/* Main Product Content: Image on left, Details on right */}
      <ProductContentWrapper>
        {/* Left Column: Image and Social Actions */}
        <ImageColumn>
          <MainProductImage src={product.imageUrl} alt={product.name} />
          <SocialActions>
            <BaseSocialButton onClick={handleShare}>
              <FaShareAlt /> Share
            </BaseSocialButton>
            <BaseSocialButton onClick={handleLike}>
              <FaHeart /> Likes ({product.likes})
            </BaseSocialButton>
          </SocialActions>
        </ImageColumn>

        {/* Right Column: Product Details */}
        <DetailsColumn>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <RatingContainer>
            {renderStars(product.rating)}
            <span>{product.reviews} Ratings</span>
          </RatingContainer>
          <ProductDescription>{product.description}</ProductDescription>
          
          <InfoRow>
            <InfoLabel>Bundle Deals:</InfoLabel>
            <InfoValue>{product.bundleDeals}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Shipping:</InfoLabel>
            <InfoValue>              {product.shippingInfo?.replace(/\$0\.20/g, '<span class="highlight">$0.20</span>') || 'Standard shipping available'}
              <br />
              <span style={{fontSize: 'var(--font-size-xsmall, 12px)', color: 'var(--color-neutral-gray, #BDBDBD)'}}>
                {product.shippingVoucher || 'Free shipping for orders above $50'}
              </span>
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Shopping Guarantee:</InfoLabel>
            <InfoValue>{product.shoppingGuarantee}</InfoValue>
          </InfoRow>

          <QuantityControl>
            <InfoLabel>Quantity:</InfoLabel>
            <QuantityButton onClick={handleDecrementQuantity} disabled={quantity <= 1}>
              <FaMinus />
            </QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={handleIncrementQuantity}>
              <FaPlus />
            </QuantityButton>
          </QuantityControl>          <ActionButtonsContainer>
            <AddToCartButton onClick={handleAddToCart}>
              <FaShoppingCart /> Add to cart
            </AddToCartButton>
            <BuyNowButton onClick={handleBuyNow}>
              Buy Now
            </BuyNowButton>
          </ActionButtonsContainer>
          {cartMessage && (
            <div style={{ 
              color: '#FFDAB9', 
              textAlign: 'center', 
              marginTop: 'var(--spacing-m, 16px)',
              padding: 'var(--spacing-s, 8px)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 'var(--border-radius-s, 4px)'
            }}>
              {cartMessage}
            </div>
          )}
        </DetailsColumn>
      </ProductContentWrapper>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <SimilarProductsSection>
          <SimilarProductsTitle>Similar Products</SimilarProductsTitle>
          <SimilarProductsGrid>
            {similarProducts.map(sp => (
              <ProductCard key={sp._id} product={sp} />
            ))}
          </SimilarProductsGrid>
        </SimilarProductsSection>
      )}
    </PageWrapper>
  );
};

export default ProductDetailPage;