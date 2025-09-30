const PriceDetails = ({
  cart,
  totalMRP,
  totalDiscount,
  totalAmount,
  currentStep,
  setCurrentStep,
}) => {
  return (
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

      <div className="flex justify-between gap-2 mt-4">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="flex-1 bg-gray-300 text-black py-3 rounded font-semibold hover:bg-gray-400 transition"
          >
            Back
          </button>
        )}

        <button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          className={`flex-1 bg-pink-500 text-white py-3 rounded font-semibold hover:bg-pink-600 transition`}
        >
          {currentStep === 1
            ? "Proceed to Address"
            : currentStep === 2
            ? "Proceed to Payment"
            : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PriceDetails;
