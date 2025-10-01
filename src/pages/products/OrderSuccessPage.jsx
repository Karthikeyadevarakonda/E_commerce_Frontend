import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
      <div className="bg-white p-6 shadow-xl w-full max-w-sm text-center space-y-4 rounded-lg">
        <h3 className="text-2xl font-bold text-green-600">🎉 Order Placed!</h3>
        <p className="text-gray-700">
          Your order has been placed successfully.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded font-semibold hover:bg-pink-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
