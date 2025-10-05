import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../../utils/useApi";
import { Heart } from "lucide-react";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import Footer from "../../components/LandingPageComponents/Footer";
import ClothesLoading from "./ClothesLoading";
import { useCart } from "../../utils/CartContext";
import { toast } from "react-hot-toast";

const EachProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const { cart, addToCart, decreaseQuantity } = useCart();

  const {
    data: product,
    fetchData,
    loading,
    error,
  } = useApi(`${import.meta.env.VITE_BASE_URL}/api/allProducts`);

  useEffect(() => {
    fetchData(`/${id}`);
  }, [id]);

  const [wishlist, setWishlist] = useState(false);

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ClothesLoading duration={2000} interval={200} />
      </div>
    );
  if (error) return <p className="text-red-500">Error fetching product</p>;
  if (!product) return <p>No product found</p>;

  const allSizes = ["S", "M", "L", "XL", "XXL"];
  const available = product.sizes || [];
  const discountedPrice = Math.round(
    product.actualPrice - (product.actualPrice * product.discount) / 100
  );

  const currentCartItem = cart.find(
    (item) => item.id === product.id && item.size === selectedSize
  );
  const quantity = currentCartItem ? currentCartItem.quantity : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size!");
      return;
    }

    addToCart(product, selectedSize);

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } bg-white shadow-lg rounded-lg p-4 flex items-center justify-between`}
      >
        <span>Added to cart!</span>
        <button
          onClick={() => {
            navigate("/cart");
            toast.dismiss(t.id);
          }}
          className="ml-4 px-3 py-1 bg-pink-500 text-white rounded"
        >
          View Cart
        </button>
      </div>
    ));
  };

  return (
    <>
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-12 2xl:px-2 2xl:py-24 relative">
        {/* Top-left Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-2 sm:top-6 sm:left-3 text-pink-400 hover:text-pink-500"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Top-right Cart icon */}
        <button
          onClick={() => navigate("/cart")}
          className="absolute top-4 right-2 sm:top-6 sm:right-6 text-pink-400 hover:text-pink-500"
        >
          <FaShoppingCart size={24} />
        </button>

        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mt-10 sm:mt-0 mb-3 sm:mb-4 break-words truncate">
          Home / {product.productType} /{" "}
          <span className="text-gray-800 font-medium">
            {product.productName}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly gap-6 md:gap-0">
          <div className="md:w-1/3 w-full flex flex-col gap-4">
            {/* Product Image */}
            <div className="w-full rounded overflow-hidden flex">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-[250px] sm:h-[300px] md:h-[450px] sm:p-2 transition-transform duration-300 object-contain"
              />
            </div>

            {/* Category & Brand */}
            <div className="text-xs sm:text-sm text-gray-500 flex justify-between">
              <span>Category: {product.productType}</span>
              <span>Brand: {product.brand}</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 w-full space-y-4 sm:space-y-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {product.brand}
              </h1>
              <p className="text-lg sm:text-lg text-gray-600 truncate">
                {product.productName}
              </p>
              <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2 text-sm">
                <p className="text-green-600 font-medium">
                  ⭐ {product.rating}
                </p>{" "}
                |<p className="text-gray-500">{product.viewCount} views</p>
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xl sm:text-3xl font-bold">
                ₹{discountedPrice}
              </p>
              <div className="flex gap-2 sm:gap-3 items-center text-sm">
                <p className="text-gray-500 line-through">
                  ₹{product.actualPrice}
                </p>
                <p className="text-red-500 font-semibold">
                  {product.discount}% OFF
                </p>
              </div>
              <p className="text-sm  text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Color */}
            <div>
              <h2 className="font-semibold text-base sm:text-base mb-2">
                Color
              </h2>
              <span className="px-4 sm:px-3 py-2 bg-gray-200 rounded sm:rounded-full text-sm sm:text-sm">
                {product.colour}
              </span>
            </div>

            {/* Labels */}
            <div>
              <h2 className="font-semibold text-sm sm:text-base mb-2">
                Highlights
              </h2>
              <div className="flex gap-2 flex-wrap">
                {product.labels?.map((label) => (
                  <span
                    key={label}
                    className="px-6 sm:px-3 py-2 text-xs sm:text-sm bg-pink-100 text-pink-600 rounded sm:rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h2 className="font-semibold text-sm sm:text-base mb-2">
                Select Size
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {allSizes.map((size) => {
                  const isAvailable = available.includes(size);
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() =>
                        setSelectedSize((prev) => (prev === size ? null : size))
                      }
                      className={`px-4 sm:px-4 py-2 sm:py-2  rounded sm:rounded-full border border-gray-400 text-xs sm:text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-pink-500 text-white border-pink-500"
                          : isAvailable
                          ? "hover:border-pink-500 hover:bg-pink-50"
                          : "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center mt-6 sm:mt-0">
              <div className="w-full flex gap-2">
                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 transition text-white py-2 sm:py-3 rounded-lg font-semibold shadow"
                >
                  {quantity > 0 ? "ADDED TO BAG" : "ADD TO BAG"}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`flex-1 flex items-center justify-center border border-gray-400 py-2 sm:py-3 rounded-lg font-semibold gap-2 transition ${
                    wishlist
                      ? "border-pink-500 bg-pink-50"
                      : "hover:border-pink-500"
                  }`}
                >
                  <Heart
                    size={18}
                    className={wishlist ? "fill-pink-500 text-pink-500" : ""}
                  />
                  {wishlist ? "WISHLISTED" : "WISHLIST"}
                </button>
              </div>

              {/* Quantity Buttons (only show if quantity > 0) */}
              {quantity > 0 && (
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => decreaseQuantity(product.id, selectedSize)}
                    className="px-2 sm:px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => addToCart(product, selectedSize)}
                    className="px-2 sm:px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EachProduct;
