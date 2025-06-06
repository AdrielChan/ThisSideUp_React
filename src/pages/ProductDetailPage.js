// File: src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaShareAlt, // Using FaShareAlt as a generic share icon
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaPlus,
  FaMinus
} from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import {ProductCard} from './ProductCard';

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

// ProductImage: Styles the main product image.
const ProductImage = styled.img`
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


// --- MOCK DATA ---
// This data would typically come from an API or props.
const mockProduct = {
  id: 'cetaphil-sunscreen-123',
  name: 'Cetaphil Sheer Mineral Sunscreen Lotion', // Updated name to match image text better
  price: 27.60,
  imageUrl: '/images/cetaphil-sun-spf50.png', // Placeholder path, ensure this image exists in public/images
  rating: 4.5, // 4.5 stars
  reviews: 96,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh lectus. Nullam ac enim blandit, gravida libero quis, convallis est. Ut eu velit nec odio tincidunt commodo. Sed ac massa convallis, sagittis tellus vitae, tempus massa. Duis hendrerit sit amet ante nec facilisis. Maecenas vel nunc ac orci fermentum.",
  likes: 27,
  bundleDeals: "Buy 3 Get 1 Free",
  shippingInfo: "Within 1 Week, with $0.20 shipping fee",
  shippingVoucher: "Obtain $1.00 voucher if order arrives late.",
  shoppingGuarantee: "14-Day Free Returns",
};

const mockSimilarProducts = [
  { id: 'similar-1', name: 'Cetaphil Sun SPF50 Liposomal', price: 19.99, imageUrl: '/images/similar-cetaphil-sun.png' },
  { id: 'similar-2', name: 'Cetaphil Sun SPF50 Spray', price: 22.50, imageUrl: '/images/similar-cetaphil-spray.png' },
  { id: 'similar-3', name: 'Cetaphil Moisturising Cream', price: 15.75, imageUrl: '/images/similar-cetaphil-cream.png' },
  { id: 'similar-4', name: 'CeraVe Hydrating Sunscreen SPF50', price: 24.00, imageUrl: '/images/similar-cerave-sunscreen.png' },
  { id: 'similar-5', name: 'CeraVe Ultra-Light Moisturizing Gel', price: 18.50, imageUrl: '/images/similar-cerave-gel.png' },
];


// --- REACT COMPONENT ---
const ProductDetailPage = () => {
  const { productId } = useParams(); // To get product ID if page is dynamic
  const navigate = useNavigate();
  // const { addItemToCart } = useCart(); // If using CartContext

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Effect to load product data (simulated)
  useEffect(() => {
    // In a real app, you'd fetch product data based on `productId`
    // For now, we use the mock data.
    // If you had multiple products, you'd filter or fetch here:
    // e.g. const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(mockProduct);
    setSimilarProducts(mockSimilarProducts);
  }, [productId]);

  // Handlers for quantity adjustment
  const handleIncrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Handler for adding to cart
  const handleAddToCart = () => {
    if (product) {
      // addItemToCart({ ...product, quantity }); // Example with CartContext
      console.log(`Added ${quantity} of ${product.name} to cart.`);
      alert(`${quantity} x ${product.name} added to cart!`);
    }
  };

  // Handler for "Buy Now"
  const handleBuyNow = () => {
    if (product) {
      console.log(`Proceeding to buy ${quantity} of ${product.name}.`);
      // Typically, this would add to cart and redirect to checkout
      alert(`Redirecting to checkout for ${quantity} x ${product.name}.`);
      // navigate('/checkout'); // Example navigation
    }
  };

  // Handler for liking a product
  const handleLike = () => {
    // Placeholder for like functionality
    alert(`You liked ${product.name}! (Likes: ${product.likes})`);
    // In a real app, update likes count, possibly in backend
  };

  // Handler for sharing a product
  const handleShare = () => {
    // Placeholder for share functionality
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name}!`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert(`Share ${product.name} via: ${window.location.href}`);
      // Fallback for browsers that don't support Web Share API
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    // const halfStar = rating % 1 !== 0; // Not used as Figma shows full stars
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={`star-${i}`} />);
      } else {
        // Figma shows all filled stars if rating is high, or more nuanced if rating is lower.
        // For simplicity, assuming Figma meant all 5 for a high rating.
        // If product.rating = 4.5, it shows 5 stars in figma
        // This logic can be adjusted if more precise star rendering (half/empty) is needed.
        stars.push(<FaStar key={`star-${i}`} style={{ opacity: i < Math.round(rating) ? 1 : 0.3 }}/>);
      }
    }
    return stars;
  };


  // Display loading state or if product not found
  if (!product) {
    return <PageWrapper><p>Loading product details...</p></PageWrapper>;
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
          <ProductImage src={product.imageUrl} alt={product.name} />
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
            <InfoValue>
              {product.shippingInfo.replace(/\$0\.20/g, '<span class="highlight">$0.20</span>')}
              <br />
              <span style={{fontSize: 'var(--font-size-xsmall, 12px)', color: 'var(--color-neutral-gray, #BDBDBD)'}}
                dangerouslySetInnerHTML={{ __html: product.shippingVoucher }} // Use with caution, ensure text is safe
              />
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
          </QuantityControl>

          <ActionButtonsContainer>
            <AddToCartButton onClick={handleAddToCart}>
              <FaShoppingCart /> Add to cart
            </AddToCartButton>
            <BuyNowButton onClick={handleBuyNow}>
              Buy Now
            </BuyNowButton>
          </ActionButtonsContainer>
        </DetailsColumn>
      </ProductContentWrapper>

      {/* Similar Products Section */}
      <SimilarProductsSection>
        <SimilarProductsTitle>Similar Products</SimilarProductsTitle>
        <SimilarProductsGrid>
          {similarProducts.map(sp => (
            <SimilarProductCard key={sp.id} onClick={() => navigate(`/product/${sp.id}`)}> {/* Navigate to other product */}
              <SimilarProductImage src={sp.imageUrl} alt={sp.name} />
              <SimilarProductName>{sp.name}</SimilarProductName>
              <SimilarProductPrice>${sp.price.toFixed(2)}</SimilarProductPrice>
            </SimilarProductCard>
          ))}
        </SimilarProductsGrid>
      </SimilarProductsSection>
    </PageWrapper>
  );
};

export default ProductDetailPage;