import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ProductCard from '../../components/products/ProductCard'; // For similar products

// Icons from react-icons
import { 
    FaArrowLeft, FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaShareSquare, FaShoppingCart, FaPlus, FaMinus 
} from 'react-icons/fa';

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  background-color: var(--color-primary-purple, #5D3FD3); /* Main purple background for this page */
  color: var(--color-text-light, #FFFFFF);
  min-height: calc(100vh - var(--header-height, 70px));
  padding-top: var(--spacing-l, 24px);
  padding-bottom: var(--spacing-xl, 32px);
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-light, #FFFFFF);
  font-size: var(--font-size-xlarge, 24px);
  cursor: pointer;
  margin-left: var(--spacing-l, 24px);
  margin-bottom: var(--spacing-m, 16px);
  display: flex;
  align-items: center;

  &:hover {
    color: var(--color-secondary-peach, #FFDAB9);
  }
`;

const ProductLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl, 32px);
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--spacing-m, 16px);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  background-color: var(--color-input-background, #FFFFFF); /* White background for image */
  padding: var(--spacing-m, 16px);
  border-radius: var(--border-radius, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  max-width: 400px; /* Control max width of image container */
  margin: 0 auto; /* Center on mobile */

  img {
    max-width: 100%;
    max-height: 400px; /* Control image size */
    object-fit: contain;
  }
`;

const InfoContainer = styled.div`
  flex: 1.5; /* More space for info */
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h1`
  font-family: var(--font-heading);
  font-size: var(--font-size-xxlarge, 32px);
  color: var(--color-text-light, #FFFFFF);
  margin: 0 0 var(--spacing-xs, 4px) 0;
`;

const ProductPrice = styled.p`
  font-size: var(--font-size-xlarge, 24px);
  font-weight: bold;
  color: var(--color-secondary-peach, #FFDAB9);
  margin: 0 0 var(--spacing-s, 8px) 0;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 4px);
  margin-bottom: var(--spacing-m, 16px);
  color: #FFD700; /* Gold for stars */
  font-size: var(--font-size-medium, 16px);
  span {
    color: var(--color-neutral-gray, #BDBDBD);
    margin-left: var(--spacing-s, 8px);
  }
`;

const ProductDescription = styled.p`
  font-size: var(--font-size-small, 14px);
  line-height: 1.7;
  color: var(--color-neutral-gray, #BDBDBD);
  margin-bottom: var(--spacing-l, 24px);
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: var(--spacing-m, 16px);
  align-items: baseline; /* Align label and value nicely */
  
  strong { /* Label like "Bundle Deals:" */
    font-family: var(--font-main); /* Sans-serif label */
    font-size: var(--font-size-medium, 16px);
    color: var(--color-secondary-peach, #FFDAB9);
    min-width: 150px; /* Consistent label width */
    font-weight: bold;
  }
  span { /* Value */
    font-size: var(--font-size-medium, 16px);
    color: var(--color-text-light, #FFFFFF);
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-s, 8px);
  margin-bottom: var(--spacing-l, 24px);
  strong {
    font-family: var(--font-main);
    font-size: var(--font-size-medium, 16px);
    color: var(--color-secondary-peach, #FFDAB9);
    min-width: 150px;
    font-weight: bold;
  }
  button {
    background-color: var(--color-background-dark-lighter, #2C2C2C);
    color: var(--color-text-light, #FFFFFF);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: var(--font-size-medium, 16px);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: color-mix(in srgb, var(--color-background-dark-lighter, #2C2C2C) 80%, white);
    }
  }
  span {
    font-size: var(--font-size-large, 20px);
    color: var(--color-text-light, #FFFFFF);
    min-width: 30px;
    text-align: center;
  }
`;

const ActionsBar = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
  gap: var(--spacing-m, 16px);
  margin-top: var(--spacing-l, 24px);
  padding-top: var(--spacing-l, 24px);
  border-top: 1px solid var(--color-primary-purple-light, #7A5FD3);
`;

const ActionButton = styled.button`
  padding: var(--spacing-s, 8px) var(--spacing-m, 16px);
  border-radius: var(--border-radius, 8px);
  font-size: var(--font-size-medium, 16px);
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-s, 8px);
  transition: background-color 0.2s ease, opacity 0.2s ease;

  &.share {
    background-color: var(--color-secondary-peach, #FFDAB9);
    color: var(--color-text-dark, #333333);
    &:hover { background-color: var(--color-secondary-peach-dark, #FFA07A); }
  }
  &.like {
    background: none;
    border: 1px solid var(--color-secondary-peach, #FFDAB9);
    color: var(--color-secondary-peach, #FFDAB9);
    svg { color: var(--color-secondary-peach, #FFDAB9); }
    &:hover { 
      background-color: color-mix(in srgb, var(--color-secondary-peach, #FFDAB9) 20%, transparent);
    }
  }
  &.add-to-cart {
    background-color: var(--color-primary-purple-darker, #4B2F9E); /* Darker purple like Figma */
    color: var(--color-text-light, #FFFFFF);
    flex-grow: 1; /* Allow it to take more space */
    &:hover { background-color: color-mix(in srgb, var(--color-primary-purple-darker, #4B2F9E) 80%, white); }
  }
  &.buy-now {
    background-color: var(--color-neutral-gray, #BDBDBD); /* Neutral buy now from Figma */
    color: var(--color-text-dark, #333333);
    flex-grow: 1;
    &:hover { background-color: color-mix(in srgb, var(--color-neutral-gray, #BDBDBD) 80%, black); }
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SimilarProductsSection = styled.section`
  margin-top: var(--spacing-xxl, 48px);
  padding: var(--spacing-l, 24px) var(--spacing-m, 16px);
  background-color: var(--color-background-dark, #1A1A1A); /* Darker background for this section */
  border-radius: var(--border-radius, 8px);
`;

const SectionTitle = styled.h2`
  font-family: var(--font-heading);
  font-size: var(--font-size-xlarge, 24px);
  color: var(--color-secondary-peach, #FFDAB9);
  margin-bottom: var(--spacing-l, 24px);
`;

const SimilarProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-m, 16px);
  /* For horizontal scroll, you might need a wrapper with overflow-x: auto and display: flex for children */
`;

// Helper for star ratings
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} />);
  if (halfStar) stars.push(<FaStarHalfAlt key="half" />);
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) stars.push(<FaRegStar key={`empty-${i}`} />);
  return stars;
};


const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { getProductById, products: allProducts } = useProducts(); // `products` for similar items
  const { addItemToCart, loading: cartLoading } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [liked, setLiked] = useState(false); // Mock like state
  const [likeCount, setLikeCount] = useState(27); // Mock like count

  useEffect(() => {
    const fetchProduct = async () => {
      setLoadingProduct(true);
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
      setLoadingProduct(false);

      if (fetchedProduct && allProducts.length > 0) {
        // Basic similar products logic (same category, not the current product)
        const related = allProducts
          .filter(p => p.category === fetchedProduct.category && p._id !== fetchedProduct._id)
          .slice(0, 4); // Show up to 4 similar products
        setSimilarProducts(related);
        setLikeCount(fetchedProduct.numRatings || 27); // Use numRatings or default
      }
    };
    fetchProduct();
  }, [productId, getProductById, allProducts]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (product) {
      addItemToCart(product._id, quantity);
      // Could show a toast/notification here
      alert(`${quantity} x ${product.name} added to cart!`);
    }
  };
  
  const handleBuyNow = () => {
    if (product) {
        addItemToCart(product._id, quantity);
        navigate('/cart'); // Or directly to checkout '/checkout'
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    // In a real app, this would be an API call
  };
  
  const handleShare = () => {
    // Basic share functionality (e.g., copy link)
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Product link copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
  };

  if (loadingProduct) return <PageWrapper><LoadingSpinner fullPage /></PageWrapper>;
  if (!product) return <PageWrapper><p>Product not found.</p></PageWrapper>;

  return (
    <PageWrapper>
      <BackButton onClick={() => navigate(-1)} title="Go Back">
        <FaArrowLeft />
      </BackButton>
      <ProductLayout>
        <ImageContainer>
          <img src={product.imageUrl || '/assets/images/placeholder-product.png'} alt={product.name} />
        </ImageContainer>
        <InfoContainer>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <RatingContainer>
            {renderStars(product.rating || 0)}
            <span>({product.numRatings || 0} Ratings)</span>
          </RatingContainer>
          <ProductDescription>
            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh lectus. Nullam ac enim blandit, gravida libero quis, convallis est."}
          </ProductDescription>
          
          <DetailRow><strong>Bundle Deals</strong> <span>Buy 3 Get 1 Free</span></DetailRow>
          <DetailRow><strong>Shipping</strong> <span>Within 1 Week, with $0.20 shipping fee</span></DetailRow>
          <DetailRow><strong>Shopping Guarantee</strong> <span>14-Day Free Returns</span></DetailRow>

          <QuantitySelector>
            <strong>Quantity</strong>
            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><FaMinus /></button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}><FaPlus /></button>
          </QuantitySelector>

          <ActionsBar>
            <ActionButton className="share" onClick={handleShare}><FaShareSquare /> Share</ActionButton>
            <ActionButton className="like" onClick={handleLike}>
                <FaHeart style={{color: liked ? 'var(--color-error-red)' : 'inherit'}} /> Likes ({likeCount})
            </ActionButton>
            <ActionButton className="add-to-cart" onClick={handleAddToCart} disabled={cartLoading}>
                <FaShoppingCart /> {cartLoading ? 'Adding...' : 'Add to cart'}
            </ActionButton>
            <ActionButton className="buy-now" onClick={handleBuyNow}>Buy Now</ActionButton>
          </ActionsBar>
        </InfoContainer>
      </ProductLayout>

      {similarProducts.length > 0 && (
        <SimilarProductsSection>
          <SectionTitle>Similar Products</SectionTitle>
          <SimilarProductsGrid>
            {similarProducts.map(p => <ProductCard key={p._id} product={p} />)}
          </SimilarProductsGrid>
        </SimilarProductsSection>
      )}
    </PageWrapper>
  );
};

export default ProductDetailPage;