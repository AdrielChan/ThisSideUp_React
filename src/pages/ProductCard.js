// File: src/components/products/ProductCard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardWrapper = styled(Link)` // Link to product detail page
  background-color: var(--color-input-background, #FFFFFF);
  color: var(--color-text-dark, #333333);
  border-radius: var(--border-radius, 8px);
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`;

const ProductImageWrapper = styled.div`
  background-color: #f7f7f7;
  padding: var(--spacing-s, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  padding: var(--spacing-m, 16px);
  text-align: left;
`;

const ProductName = styled.h3`
  font-size: var(--font-size-small, 14px);
  font-family: var(--font-main);
  color: var(--color-text-dark, #333333);
  margin: 0 0 var(--spacing-xs, 4px) 0;
  line-height: 1.3;
  min-height: 2.6em; 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductPrice = styled.p`
  font-size: var(--font-size-medium, 16px);
  font-weight: bold;
  color: var(--color-primary-purple, #5D3FD3);
  margin: 0;
`;

const ProductCard = ({ product }) => {
  if (!product) return null;


  // If your images are directly in public/Product Photos, 
  let imagePath = product.imageUrl || '/assets/images/placeholder-product.png';
  if (imagePath.startsWith('public/')) {
    imagePath = `/${imagePath}`; // e.g., /public/Product Photos/Candy Camo.jpeg
                                 // Make sure your server serves the public folder correctly
  } else if (!imagePath.startsWith('/assets/')) {

  }


  return (
    // Link to the unique product detail page
    <CardWrapper to={`/product/${product._id}`}> 
      <ProductImageWrapper>
        <ProductImage src={imagePath} alt={product.name} />
      </ProductImageWrapper>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
      </ProductInfo>
    </CardWrapper>
  );
};

export default ProductCard;