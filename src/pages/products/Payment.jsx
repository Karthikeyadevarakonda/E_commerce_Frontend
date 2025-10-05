import { useState, useEffect } from "react";
import Gpay from "../../assets/google-pay.png";
import payTm from "../../assets/paytm.svg";
import { usePayment } from "../../utils/PaymentContext";

const Payment = () => {
  const { paymentMethod, setPaymentMethod } = usePayment();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // Auto-select "card" only if all fields are filled
  useEffect(() => {
    const { cardNumber, cardName, expiry, cvv } = cardDetails;
    const allFilled = cardNumber && cardName && expiry && cvv;

    if (allFilled) {
      // ✅ auto-switch to card even if user had selected Paytm etc
      if (paymentMethod !== "card") setPaymentMethod("card");
    }
  }, [cardDetails]);

  const activeClass =
    "border-pink-500 bg-pink-50 ring-2 ring-pink-300 shadow-md";

  // Handle toggling for wallet/COD methods
  const handleToggle = (method) => {
    setPaymentMethod(paymentMethod === method ? "" : method);
  };

  return (
    <div className="sm:bg-gray-50 p-4 sm:p-6 sm:rounded-2xl sm:shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>

      {/* Card Form (always visible as default option) */}
      <form className="space-y-5">
        {/* Card Number */}
        <div className="relative">
          <input
            type="text"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-12"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            💳
          </span>
        </div>

        {/* Cardholder Name */}
        <div className="relative">
          <input
            type="text"
            placeholder="Cardholder Name"
            value={cardDetails.cardName}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardName: e.target.value })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-12"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            👤
          </span>
        </div>

        {/* Expiry & CVV */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Expiry MM/YY"
              value={cardDetails.expiry}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              📅
            </span>
          </div>
          <div className="relative w-1/2">
            <input
              type="password"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition pl-10"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>
          </div>
        </div>
      </form>

      {/* Alternative Payment Options */}
      <div className="mt-6">
        <p className="text-gray-500 mb-3">Or pay with:</p>

        <div className="flex gap-4 mt-4">
          {/* Google Pay */}
          <button
            onClick={() => handleToggle("Google Pay")}
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 border p-3 rounded-xl hover:bg-gray-100 transition ${
              paymentMethod === "Google Pay" ? activeClass : "border-gray-300"
            }`}
          >
            <img src={Gpay} alt="Google Pay" className="h-8 w-8" />
          </button>

          {/* Paytm */}
          <button
            onClick={() => handleToggle("Paytm")}
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 border p-3 rounded-xl hover:bg-gray-100 transition ${
              paymentMethod === "Paytm" ? activeClass : "border-gray-300"
            }`}
          >
            <img src={payTm} alt="Paytm Logo" className="h-8 w-8" />
          </button>

          {/* PhonePe */}
          <button
            onClick={() => handleToggle("PhonePe")}
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 border p-3 rounded-xl hover:bg-gray-100 transition ${
              paymentMethod === "PhonePe" ? activeClass : "border-gray-300"
            }`}
          >
            <img
              src="data:image/png;base64,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"
              alt="PhonePe Logo"
              className="h-8 w-8"
            />
          </button>
        </div>

        {/* Cash on Delivery */}
        <button
          onClick={() => handleToggle("COD")}
          type="button"
          className={`w-full flex items-center justify-center gap-3 mt-4 border p-3 rounded-xl hover:bg-gray-100 transition ${
            paymentMethod === "COD" ? activeClass : "border-gray-300"
          }`}
        >
          💵 <span className="font-semibold">Cash on Delivery</span>
        </button>
      </div>
    </div>
  );
};

export default Payment;
