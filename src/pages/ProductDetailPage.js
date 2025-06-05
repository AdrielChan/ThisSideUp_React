// File: src/pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from './ProductCard';
import { FaArrowLeft, FaShareAlt, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading: contextLoading, error: contextError, products: allProducts } = useProducts();

  const [product, setProduct] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  //colors and gradient test
  const pageBackground = "bg-gradient-to-br from-black via-purple-900 to-purple-800";
  const textColorPrimary = "text-white";
  const textColorSubtle = "text-gray-300";
  const textColorHighlight = "text-pink-400";

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        setLocalLoading(true);
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        if (fetchedProduct) {
          setLikes(fetchedProduct.likesCount || 50);
          if (allProducts && allProducts.length > 0) {
            const related = allProducts
              .filter(p => p.category === fetchedProduct.category && p._id !== fetchedProduct._id)
              .slice(0, 5);
            setSimilarProducts(related);
          } else {
            setSimilarProducts([
              { _id: 'sim1', name: "Similar Product 1", imageUrl: "/images/img_cetaphilsheermineralsunscreenlotionspf50fragrancefree3oz31c4fa0fcbeb43d084ae168d51d38f5f0783adf0de938f2148f6902345bfee3b.png", price: 20.00, category: "Skincare" },
              { _id: 'sim2', name: "Similar Product 2", imageUrl: "/images/img_5099164408201.png", price: 22.00, category: "Skincare" },
              { _id: 'sim3', name: "Similar Product 3", imageUrl: "/images/placeholder-product.png", price: 25.00, category: "Skincare" },
              { _id: 'sim4', name: "Similar Product 4", imageUrl: "/images/placeholder-product.png", price: 28.00, category: "Skincare" },
              { _id: 'sim5', name: "Similar Product 5", imageUrl: "/images/placeholder-product.png", price: 19.00, category: "Skincare" },
            ]);
          }
        }
        setLocalLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId, getProductById, allProducts]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const renderStars = (ratingValue) => {
    const totalStars = 5;
    let stars = [];
    const numRating = parseFloat(ratingValue);
    for (let i = 1; i <= totalStars; i++) {
      if (i <= numRating) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
      } else if (i === Math.ceil(numRating) && !Number.isInteger(numRating)) {
        stars.push(<FaStar key={`half-${i}`} className="text-yellow-400 opacity-60" />);
      } else {
        stars.push(<FaStar key={`empty-${i}`} className="text-gray-600" />);
      }
    }
    return <div className="flex items-center text-xl">{stars}</div>;
  };

  if (localLoading || contextLoading) {
    return (
      <div className={`min-h-screen ${pageBackground} ${textColorPrimary} flex justify-center items-center`}>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (contextError) {
    return (
      <div className={`min-h-screen ${pageBackground} ${textColorPrimary} flex justify-center items-center`}>
        <p>Error: {contextError}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${pageBackground} ${textColorPrimary} flex justify-center items-center`}>
        <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="absolute top-6 left-6 z-20 text-white text-3xl p-3 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
        >
          <FaArrowLeft />
        </button>
        <p className="text-center text-xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${pageBackground} ${textColorPrimary} selection:bg-pink-500 selection:text-white`}>
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="fixed top-6 left-6 z-50 text-white text-2xl sm:text-3xl p-2 sm:p-3 bg-black/40 hover:bg-black/60 rounded-full transition-colors backdrop-blur-sm"
      >
        <FaArrowLeft />
      </button>

      

      <main className="relative pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

            {/* Left Column: Image */}
            <div className="w-full lg:w-2/5 xl:w-1/3 flex-shrink-0 flex justify-center">
              <div className="bg-white/10 p-3 sm:p-4 rounded-lg shadow-xl aspect-square max-w-md lg:max-w-none w-full flex items-center justify-center" style={{ width: '400px', height: '400px', maxWidth: '100%' }}>
                <img
                  src={product.imageUrl || "/images/placeholder-product.png"}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col"> {/* Ensure this column takes remaining space and arranges its content vertically */}
              <h1 className={`text-3xl sm:text-4xl font-bold ${textColorPrimary} font-instrument-sans mb-2`}>
                {product.name || "Product Name"}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-1 mb-4">
                <span className={`text-3xl font-semibold ${textColorHighlight}`}>
                  ${product.price ? product.price.toFixed(2) : '27.60'}
                </span>
                <div className="flex items-center gap-2">
                  {renderStars(product.rating || 4.5)}
                  <span className={`text-base sm:text-lg ${textColorSubtle}`}>
                    {product.numRatings || 96} Ratings
                  </span>
                </div>
              </div>

              <p className={`text-sm sm:text-base ${textColorSubtle} mb-6 max-w-2xl leading-relaxed`}>
                {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh lectus. Nullam ac enim blandit, gravida libero quis, convallis est. Ut eu velit nec odio tincidunt commodo. Sed ac massa convallis, sagittis tellus vitae, tempus massa. Duis hendrerit sit amet ante nec facilisis. Maecenas vel nunc ac orci fermentum."}
              </p>

              {/* Info Sections: Bundle, Shipping, Guarantee */}
              <div className="space-y-4 mb-8">
                {[
                  { label: "Bundle Deals", value: product.bundleDeals || "Buy 3 Get 1 Free" },
                  { label: "Shipping", value: product.shippingInfo?.time || "Within 1 Week, with $0.20 shipping fee", subValue: product.shippingInfo?.voucher || "Obtain $1.00 voucher if order arrives late." },
                  { label: "Shopping Guarantee", value: product.guarantee || "14-Day Free Returns" },
                ].map(item => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:items-start">
                    <span className={`text-base sm:text-lg font-medium ${textColorHighlight} w-full sm:w-1/3 xl:w-1/4 mb-1 sm:mb-0 flex-shrink-0`}>{item.label}</span>
                    <div className="w-full sm:w-2/3 xl:w-3/4">
                        <span className={`text-base sm:text-lg ${textColorPrimary}`}>{item.value}</span>
                        {item.subValue && <p className={`text-xs sm:text-sm ${textColorSubtle} mt-0.5`}>{item.subValue}</p>}
                    </div>
                  </div>
                ))}

                {/* Quantity Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center pt-2">
                  <span className={`text-base sm:text-lg font-medium ${textColorHighlight} w-full sm:w-1/3 xl:w-1/4 mb-2 sm:mb-0 flex-shrink-0`}>Quantity</span>
                  <div className="flex items-center bg-gray-800/70 border border-gray-700 rounded-md h-9 sm:h-10">
                    <button onClick={() => handleQuantityChange(-1)} className="w-9 sm:w-10 h-full flex items-center justify-center text-xl hover:bg-gray-700/80 transition-colors rounded-l-md" disabled={quantity <=1}>-</button>
                    <div className="w-10 sm:w-12 h-full flex items-center justify-center border-x border-gray-700">
                      <span className={`text-md sm:text-lg font-bold ${textColorPrimary}`}>{quantity}</span>
                    </div>
                    <button onClick={() => handleQuantityChange(1)} className="w-9 sm:w-10 h-full flex items-center justify-center text-xl hover:bg-gray-700/80 transition-colors rounded-r-md">+</button>
                  </div>
                </div>
              </div>

              {/* === MOVED ACTION BUTTONS HERE === */}
              <div className="mt-auto pt-6 border-t border-purple-700/50"> {/* `mt-auto` will push this section to the bottom if the content above is short */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-y-4 gap-x-3">
                    {/* Left Aligned Buttons: Share, Likes */}
                    <div className="flex items-center gap-x-3 sm:gap-x-4">
                    <button className="flex items-center gap-1.5 text-white bg-pink-500 hover:bg-pink-600 px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors">
                        <FaShareAlt />
                        <span>Share</span>
                    </button>
                    <button onClick={handleLike} className="flex items-center gap-1.5 text-white py-2 px-2 rounded-md hover:bg-white/10 transition-colors">
                        {isLiked ? <FaHeart className="text-pink-500 text-lg sm:text-xl" /> : <FaHeart className="text-gray-400 text-lg sm:text-xl hover:text-pink-400" />}
                        <span className="text-xs sm:text-sm">Likes ({likes})</span>
                    </button>
                    </div>
                    {/* Right Aligned Buttons: Add to Cart, Buy Now */}
                    <div className="flex items-center gap-x-2 sm:gap-x-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2.5 rounded-md font-semibold text-sm sm:text-base transition-colors">
                        <FaShoppingCart />
                        <span>Add to cart</span>
                    </button>
                    <button className="flex-1 sm:flex-none text-purple-700 bg-pink-400 hover:bg-pink-500 px-4 py-2.5 rounded-md font-semibold text-sm sm:text-base transition-colors">
                        <span>Buy Now</span>
                    </button>
                    </div>
                </div>
              </div>
              {/* === END OF MOVED ACTION BUTTONS === */}

            </div> {/* End Right Column */}
          </div> {/* End Main Two-Column Layout */}
        </div> {/* End Container */}

        {/* Similar Products Section (remains outside the two-column layout) */}
         <section 
          className="mt-16 pt-10 pb-4 bg-black/30 backdrop-blur-sm mx-auto rounded-lg shadow-lg" 
          style={{ maxWidth: '300px' }} // Example: Set a max-width for the entire section
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-2xl sm:text-3xl font-bold ${textColorPrimary} font-instrument-sans mb-6 text-right lg:text-right`}>
              Similar Products
            </h2>
            {similarProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {similarProducts.map((simProduct) => (
                  <ProductCard key={simProduct._id} product={simProduct} />
                ))}
              </div>
            ) : (
              <p className={`${textColorSubtle} text-center`}>No similar products found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;