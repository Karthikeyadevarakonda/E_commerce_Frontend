import React from "react";
import Gpay from "../../assets/google-pay.png";
import payTm from "../../assets/paytm.svg";
import { useState } from "react";

const Payment = () => {
  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

      <form className="space-y-5">
        {/* Card Number */}
        <div className="relative">
          <input
            type="text"
            placeholder="Card Number"
            value={payment.cardNumber}
            onChange={(e) =>
              setPayment({ ...payment, cardNumber: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-12"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            💳
          </span>
        </div>

        {/* Cardholder Name */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={payment.cardName}
            onChange={(e) =>
              setPayment({ ...payment, cardName: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-12"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            👤
          </span>
        </div>

        {/* Expiry & CVV */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Expiry MM/YY"
              value={payment.expiry}
              onChange={(e) =>
                setPayment({ ...payment, expiry: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              📅
            </span>
          </div>
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="CVV"
              value={payment.cvv}
              onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔒
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-3 rounded font-semibold hover:bg-pink-600 transition"
        >
          Pay Now
        </button>
      </form>

      {/* Alternative Payment Options */}
      <div className="mt-6">
        <p className="text-gray-500 mb-3">Or pay with:</p>

        {/* Digital Payments */}
        <div className="flex gap-4 mt-4">
          {/* Google Pay */}
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-xl hover:bg-gray-100 transition">
            <div className="h-10 w-10 flex items-center justify-center">
              <img
                src={Gpay}
                alt="Google Pay"
                className="h-full w-full object-contain"
              />
            </div>
          </button>

          {/* Paytm */}
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-xl hover:bg-gray-100 transition">
            <div className="h-10 w-10 flex items-center justify-center">
              <img
                src={payTm}
                alt="Paytm Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </button>

          {/* PhonePe */}
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-xl hover:bg-gray-100 transition">
            <div className="h-10 w-10 flex items-center justify-center">
              <img
                src="https://w7.pngwing.com/pngs/332/615/png-transparent-phonepe-india-unified-payments-interface-india-purple-violet-text.png"
                alt="PhonePe Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </button>
        </div>

        {/* Cash on Delivery */}
        <button className="w-full flex items-center justify-center gap-3 mt-4 border border-gray-300 p-3 rounded-xl hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 1.343-3 3v7h6v-7c0-1.657-1.343-3-3-3zM5 21h14v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2zM12 2v4"
            />
          </svg>
          <span className="text-sm font-semibold">Cash on Delivery</span>
        </button>
      </div>
    </div>
  );
};

export default Payment;
