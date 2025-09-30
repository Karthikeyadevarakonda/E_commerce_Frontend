import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gray-50 rounded-lg shadow-md h-screen">
      {/* Icon */}
      <div className="bg-pink-100 p-6 rounded-full shadow-sm mb-6">
        <FaShoppingCart className="text-pink-500 text-5xl" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Your Cart is Empty
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Looks like you haven’t added anything to your bag yet. Explore our
        categories and find something you love ❤️
      </p>

      {/* Button */}
      <Link
        to="/products"
        className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg shadow hover:bg-pink-600 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
