import { useState } from "react";
import toast from "react-hot-toast";
import useApi from "../../utils/useApi";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../utils/PaymentContext";
import { useCart } from "../../utils/CartContext";
import OrderSuccessPage from "./OrderSuccessPage";

const PriceDetails = ({
  cart,
  totalMRP,
  totalDiscount,
  totalAmount,
  currentStep,
  setCurrentStep,
}) => {
  const { postData, loading } = useApi("http://localhost:7001");
  const navigate = useNavigate();
  const { paymentMethod } = usePayment();
  const { clearCart } = useCart();

  // 🔥 For shake animation
  const [shake, setShake] = useState(false);

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const res = await postData("/api/orders", {
      userId: "cmfwakt5l0000ft3wyxpssmcz",
      items,
      status: "pending",
    });

    if (res) {
      toast.success("🎉 Order placed successfully!");
      setCurrentStep(4);

      clearCart();
      localStorage.removeItem("address");
    } else {
      toast.error("❌ Failed to place order");
    }
  };

  // ✅ Check if address is filled in localStorage
  const isAddressFilled = () => {
    const savedAddress = JSON.parse(localStorage.getItem("address") || "{}");
    return (
      savedAddress.name &&
      savedAddress.street &&
      savedAddress.city &&
      savedAddress.zip &&
      savedAddress.phone
    );
  };

  const handleNext = () => {
    // ✅ Step 2: Check address before payment
    if (currentStep === 2) {
      if (!isAddressFilled()) {
        toast.error(
          "❌ Please fill in your shipping address before proceeding!"
        );
        setShake(true);
        setTimeout(() => setShake(false), 500); // remove shake after animation
        return;
      }
    }

    // ✅ Step 3: Check payment before placing order
    if (currentStep === 3) {
      if (!paymentMethod) {
        toast.error("❌ Please complete payment details before placing order!");
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }
      placeOrder();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        {currentStep === 1 && (
          <>
            <h2 className="font-semibold text-lg">
              Price Details ({cart.length} items)
            </h2>
            <div className="flex justify-between">
              <p>Total MRP</p>
              <p>₹{totalMRP}</p>
            </div>
            <div className="flex justify-between text-green-600">
              <p>Discount on MRP</p>
              <p>- ₹{totalDiscount}</p>
            </div>
            <div className="flex justify-between">
              <p>Platform & Event Fee</p>
              <p>₹20</p>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <p>Total Amount</p>
              <p>₹{totalAmount}</p>
            </div>
          </>
        )}

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-between gap-2 mt-4">
          {currentStep > 1 && currentStep < 4 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="flex-1 bg-gray-300 text-black py-3 rounded font-semibold hover:bg-gray-400 transition"
            >
              Back
            </button>
          )}

          {currentStep < 4 && (
            <button
              onClick={handleNext}
              disabled={loading}
              className={`flex-1 ${
                currentStep === 3
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-pink-500 hover:bg-pink-600"
              } text-white py-3 rounded font-semibold transition ${
                shake ? "animate-[shake_0.3s_ease-in-out]" : ""
              }`}
            >
              {loading
                ? "Placing Order..."
                : currentStep === 1
                ? "Proceed to Address"
                : currentStep === 2
                ? "Proceed to Payment"
                : "Place Order"}
            </button>
          )}
        </div>
      </div>

      {currentStep === 4 && <OrderSuccessPage />}
    </>
  );
};

export default PriceDetails;
