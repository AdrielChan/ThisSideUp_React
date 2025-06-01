import React, { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(27);

  // Dummy product data
  const product = {
    id: id,
    name: "Product Name",
    price: "$27.60",
    rating: 5,
    totalRatings: 96,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh lectus. Nullam ac enim blandit, gravida libero quis, convallis est. Ut eu velit nec odio tincidunt commodo. Sed ac massa convallis, sagittis tellus vitae, tempus massa. Duis hendrerit sit amet ante nec facilisis. Maecenas vel nunc ac orci fermentum.",
    image: "/images/img_cetaphilsheermineralsunscreenlotionspf50fragrancefree3oz31c4fa0fcbeb43d084ae168d51d38f5f0783adf0de938f2148f6902345bfee3b.png",
    bundleDeals: "Buy 3 Get 1 Free",
    shipping: {
      time: "Within 1 Week, with $0.20 shipping fee",
      voucher: "Obtain $1.00 voucher if order arrives late."
    },
    guarantee: "14-Day Free Returns"
  };

  const similarProducts = [
    {
      id: 1,
      name: "Product Name",
      image: "/images/img_cetaphilsheermineralsunscreenlotionspf50fragrancefree3oz31c4fa0fcbeb43d084ae168d51d38f5f0783adf0de938f2148f6902345bfee3b.png"
    },
    {
      id: 2,
      name: "Product Name",
      image: "/images/img_5099164408201.png"
    },
    {
      id: 3,
      name: "Product Name",
      image: "/images/img_image.png"
    },
    {
      id: 4,
      name: "Product Name",
      image: "/images/img_image_232x232.png"
    },
    {
      id: 5,
      name: "Product Name",
      image: "/images/img_image_1.png"
    },
    {
      id: 6,
      name: "Product Name",
      image: "/images/img_image_2.png"
    }
  ];

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} item(s)`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#7600ac]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-11 z-10 hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/img_back_arrow.png"
            alt="Back"
            className="w-[47px] h-[47px]"
          />
        </button>

        {/* Product Details Section */}
        <div className="flex items-start justify-between px-10 pt-16 pb-8">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-[500px] h-[500px] rounded-[10px] object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="flex-1 ml-10 text-white">
            {/* Product Name and Price */}
            <h1 className="text-[36px] font-medium leading-[44px] text-white font-instrument-sans mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-6">
              <span className="text-[24px] font-medium leading-[30px] text-[#c96b99]">
                {product.price}
              </span>
              <div className="flex items-center gap-2">
                <img
                  src="/images/img_group_31.png"
                  alt="Rating"
                  className="w-[125px] h-[25px]"
                />
                <span className="text-[24px] font-medium leading-[30px] text-[#fdddfd]">
                  {product.totalRatings} Ratings
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-8">
              <p className="text-[16px] font-medium leading-[19px] bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent max-w-[418px]">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="space-y-4 mb-8">
              {/* Bundle Deals */}
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-medium leading-[30px] text-[#f09f9c]">
                  Bundle Deals
                </span>
                <span className="text-[24px] font-medium leading-[30px] text-white">
                  {product.bundleDeals}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex items-start justify-between">
                <span className="text-[24px] font-medium leading-[30px] text-[#f09f9c]">
                  Shipping
                </span>
                <div className="text-right max-w-[431px]">
                  <p className="text-[24px] font-medium leading-[29px] text-white">
                    {product.shipping.time}
                  </p>
                  <p className="text-[16px] font-medium leading-[29px] text-[#cccccc]">
                    {product.shipping.voucher}
                  </p>
                </div>
              </div>

              {/* Shopping Guarantee */}
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-medium leading-[29px] text-[#f09f9c]">
                  Shopping<br />Guarantee
                </span>
                <span className="text-[24px] font-medium leading-[30px] text-white">
                  {product.guarantee}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between">
                <span className="text-[24px] font-medium leading-[30px] text-[#f09f9c]">
                  Quantity
                </span>
                <div className="flex items-center bg-[#404040] border border-[#202020] rounded-[4px] h-[40px]">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-[40px] h-[40px] flex items-center justify-center hover:bg-[#505050] transition-colors"
                  >
                    <img
                      src="/images/img_subtract.png"
                      alt="Decrease"
                      className="w-[32px] h-[32px]"
                    />
                  </button>
                  <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#404040] border-x border-[#202020]">
                    <span className="text-[20px] font-bold leading-[25px] text-white font-inter">
                      {quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-[40px] h-[40px] flex items-center justify-center hover:bg-[#505050] transition-colors"
                  >
                    <img
                      src="/images/img_plus_math.png"
                      alt="Increase"
                      className="w-[32px] h-[32px]"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                size="custom"
                className="h-[50px] w-[250px] rounded-[17px] text-[32px] font-medium leading-[40px]"
                onClick={handleAddToCart}
                icon={
                  <img
                    src="/images/img_add_shopping_cart.png"
                    alt="Cart"
                    className="w-[40px] h-[40px]"
                  />
                }
              >
                Add to cart
              </Button>
              <Button
                variant="secondary"
                size="custom"
                className="h-[50px] w-[161px] rounded-[17px] text-[32px] font-medium leading-[40px]"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="share"
              size="custom"
              className="h-[42px] w-[150px] rounded-[5px] text-[29px] font-medium leading-[36px]"
              onClick={handleShare}
              icon={
                <img
                  src="/images/img_forward_arrow.png"
                  alt="Share"
                  className="w-[40px] h-[40px]"
                />
              }
            >
              Share
            </Button>
            
            <div className="w-[1px] h-[50px] bg-[#808080]"></div>
            
            <button
              onClick={handleLike}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/img_heart.png"
                alt="Heart"
                className={`w-[50px] h-[50px] ${isLiked ? 'filter-red' : ''}`}
              />
              <span className="text-[32px] font-medium leading-[40px] text-white">
                Likes ({likes})
              </span>
            </button>
          </div>
        </div>

        {/* Similar Products Section */}
        <section className="bg-gradient-to-b from-[#242424] to-black py-8">
          <div className="px-8">
            <h2 className="text-[36px] font-medium leading-[44px] text-white font-instrument-sans mb-6">
              Similar Products
            </h2>
            
            <div className="grid grid-cols-6 gap-6">
              {similarProducts.map((similarProduct) => (
                <Card
                  key={similarProduct.id}
                  className="bg-transparent"
                  hover={true}
                  padding="none"
                  shadow="none"
                  onClick={() => navigate(`/product/${similarProduct.id}`)}
                >
                  <img
                    src={similarProduct.image}
                    alt={similarProduct.name}
                    className="w-[232px] h-[232px] rounded-[10px] object-cover mb-4"
                  />
                  <h3 className="text-[24px] font-normal leading-[29px] text-white font-instrument-sans px-2">
                    {similarProduct.name}
                  </h3>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;