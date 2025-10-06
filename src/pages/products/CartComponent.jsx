import { useState } from "react";

import { useCart } from "../../utils/CartContext";
import Payment from "./Payment";
import Address from "./Address";
import CartList from "./CartList";
import StepsHeader from "./StepsHeader";
import PriceDetails from "./PriceDetails";
import EmptyCart from "./EmptyCart";

const CartComponent = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);

  if (cart.length === 0 && currentStep !== 4) return <EmptyCart />;

  const totalMRP = cart.reduce(
    (acc, item) => acc + item.actualPrice * item.quantity,
    0
  );
  const totalDiscount = cart.reduce(
    (acc, item) =>
      acc + (item.quantity * (item.actualPrice * item.discount)) / 100,
    0
  );
  const totalAmount = totalMRP - totalDiscount + 20;

  return (
    <div className="max-w-6xl mx-auto sm:p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-4">
        {currentStep !== 4 && <StepsHeader currentStep={currentStep} />}

        {currentStep === 1 && (
          <div className="bg-white p-4 rounded-lg shadow space-y-4 overflow-y-auto h-auto">
            {cart.map((item) => (
              <CartList
                key={`${item.id}-${item.size}`}
                item={item}
                addToCart={addToCart}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
        )}

        {currentStep === 2 && <Address setCurrentStep={setCurrentStep} />}

        {currentStep === 3 && <Payment />}
      </div>

      <div className="w-full md:w-1/3 space-y-4">
        <PriceDetails
          cart={cart}
          totalMRP={totalMRP}
          totalDiscount={totalDiscount}
          totalAmount={totalAmount}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  );
};

export default CartComponent;
