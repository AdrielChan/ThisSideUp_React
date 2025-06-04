import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Added Link


import { useProducts } from '../contexts/ProductContext'; // To get product details
// Import ProductCard for "Similar Products" section
import ProductCard from './ProductCard'; 



const ProductDetailPage = () => {
  const { id: productId } = useParams(); // Renamed to productId for clarity
  
  const { getProductById, loading: contextLoading, error: contextError, products: allProducts } = useProducts();

  const [product, setProduct] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0); // Initialize with 0, update from product
  const [similarProducts, setSimilarProducts] = useState([]);


  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        setLocalLoading(true);
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        if (fetchedProduct) {
          setLikes(fetchedProduct.numRatings || 27); // Use actual ratings or a default
           // Basic similar products logic (same category, not the current product)
          if (allProducts && allProducts.length > 0) {
            const related = allProducts
              .filter(p => p.category === fetchedProduct.category && p._id !== fetchedProduct._id)
              .slice(0, 4); // Show up to 4 similar products
            setSimilarProducts(related);
          } else {
            // Fallback if allProducts isn't populated yet (e.g. direct navigation)
            // You might fetch some related products separately here
            // For simplicity, using dummy data from your example if allProducts is empty
            setSimilarProducts([
              { _id: 'sim1', name: "Similar Product 1", imageUrl: "/images/img_cetaphilsheermineralsunscreenlotionspf50fragrancefree3oz31c4fa0fcbeb43d084ae168d51d38f5f0783adf0de938f2148f6902345bfee3b.png", price: 20.00 },
              { _id: 'sim2', name: "Similar Product 2", imageUrl: "/images/img_5099164408201.png", price: 22.00 },
            ]);
          }
        }
        setLocalLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId, getProductById, allProducts]); // Add allProducts to dependency for similar products

  // --- Event Handlers (from your ProductCard copy.js) ---
  const handleQuantityChange = (change) => { /* ... same as your code ... */ 
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleLike = () => { /* ... same as your code ... */ 
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };
  
  // --- Render Logic ---
  if (localLoading || contextLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#7600ac] text-white flex justify-center items-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (contextError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#7600ac] text-white flex justify-center items-center">
        <p>Error: {contextError}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-[#7600ac] text-white flex justify-center items-center">
        <main className="relative pt-16">
         
            
          <p className="text-center text-xl">Product not found.</p>
        </main>
      </div>
    );
  }

  // --- Main JSX (from your ProductCard copy.js, adapted for fetched product) ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#7600ac]">
      <main className="relative">


        <div className="flex items-start justify-between px-10 pt-16 pb-8">
          <div className="flex-shrink-0 flex justify-center items-center"> {/* Added flex to center image if it's smaller than container */}
            <img
              src={product.imageUrl || "/images/placeholder-product.png"}
              alt={product.name}
              className="rounded-[10px] object-contain" // Use object-contain to see full image
              style={{
                maxWidth: '500px', // Max width for the image
                maxHeight: '500px', // Max height for the image
                width: 'auto',      // Allow image to shrink based on aspect ratio
                height: 'auto'      // Allow image to shrink based on aspect ratio
              }}
            />
          </div>

          <div className="flex-1 ml-10 text-white">
            <h1 className="text-[36px] font-medium leading-[44px] text-white font-instrument-sans mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-6">
              <span className="text-[24px] font-medium leading-[30px] text-[#c96b99]">
                ${product.price ? product.price.toFixed(2) : 'N/A'}
              </span>
              <div className="flex items-center gap-2">
                {/* Assuming you have an image for rating stars or implement renderStars */}
                <img src="/images/img_group_31.png" alt="Rating" className="w-[125px] h-[25px]" />
                <span className="text-[24px] font-medium leading-[30px] text-[#fdddfd]">
                  {product.numRatings || 0} Ratings
                </span>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-[16px] font-medium leading-[19px] bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent max-w-[418px]">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-medium leading-[30px] text-[#f09f9c]">Bundle Deals</span>
                <span className="text-[24px] font-medium leading-[30px] text-white">
                  {/* Example static data, replace with product.bundleDeals if available */}
                  Buy 3 Get 1 Free 
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[24px] font-medium leading-[30px] text-[#f09f9c]">Shipping</span>
                <div className="text-right max-w-[431px]">
                  <p className="text-[24px] font-medium leading-[29px] text-white">
                    {/* Example static data, replace with product.shipping.time if available */}
                    Within 1 Week, with $0.20 shipping fee
                  </p>
                  <p className="text-[16px] font-medium leading-[29px] text-[#cccccc]">
                    {/* Example static data, replace with product.shipping.voucher if available */}
                    Obtain $1.00 voucher if order arrives late.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-medium leading-[29px] text-[#f09f9c]">Shopping<br />Guarantee</span>
                <span className="text-[24px] font-medium leading-[30px] text-white">
                  {/* Example static data, replace with product.guarantee if available */}
                  14-Day Free Returns
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-medium leading-[30px] text-[#f09f9c]">Quantity</span>
                <div className="flex items-center bg-[#404040] border border-[#202020] rounded-[4px] h-[40px]">
                  <button onClick={() => handleQuantityChange(-1)} className="w-[40px] h-[40px] flex items-center justify-center hover:bg-[#505050] transition-colors" disabled={quantity <=1}>
                    <img src="/images/img_subtract.png" alt="Decrease" className="w-[32px] h-[32px]" />
                  </button>
                  <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#404040] border-x border-[#202020]">
                    <span className="text-[20px] font-bold leading-[25px] text-white font-inter">{quantity}</span>
                  </div>
                  <button onClick={() => handleQuantityChange(1)} className="w-[40px] h-[40px] flex items-center justify-center hover:bg-[#505050] transition-colors">
                    <img src="/images/img_plus_math.png" alt="Increase" className="w-[32px] h-[32px]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">

              
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-4">
            <div className="w-[1px] h-[50px] bg-[#808080]"></div>
            <button onClick={handleLike} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/images/img_heart.png" alt="Heart" className={`w-[50px] h-[50px] ${isLiked ? 'filter-red' : ''}`} /> {/* Add CSS for .filter-red if needed */}
              <span className="text-[32px] font-medium leading-[40px] text-white">Likes ({likes})</span>
            </button>
          </div>
        </div>

        <section className="bg-gradient-to-b from-[#242424] to-black py-8">
          <div className="px-8">
            <h2 className="text-[36px] font-medium leading-[44px] text-white font-instrument-sans mb-6">
              Similar Products
            </h2>
            {similarProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {similarProducts.map((simProduct) => (
                  // Using the ProductCard component for consistency
                  <ProductCard key={simProduct._id} product={simProduct} />
                ))}
              </div>
            ) : (
              <p className="text-white text-center">No similar products found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;