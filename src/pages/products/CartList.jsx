import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const CartList = ({ item, addToCart, decreaseQuantity, removeFromCart }) => {
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const itemKey = item.id + item.size;
  const isRemoving = removeConfirm === itemKey;

  return (
    <div
      key={itemKey}
      className="relative flex flex-col md:flex-row items-start border-b border-gray-300 pb-4 mb-4 last:mb-0 last:border-0 gap-4 w-full"
    >
      {/* Remove Icon */}
      {isRemoving && (
        <button
          onClick={() => setRemoveConfirm(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      )}

      {/* Left Section: Checkbox + Image + Details */}
      <div className="flex flex-row items-center gap-4 sm:gap-6 flex-1 w-full">
        <input type="checkbox" className="mt-2 md:mt-0" checked readOnly />

        <img
          src={item.image}
          alt={item.productName}
          className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-44 object-cover rounded"
        />

        <div className="flex-1 flex flex-col gap-1 text-xs sm:text-sm md:text-base">
          <h1 className="font-semibold">{item.brand}</h1>
          <h2 className="text-black/70">{item.productName}</h2>
          <p className="text-gray-500">Sold by: {item.brand}</p>
          <p className="text-gray-500">Size: {item.size}</p>
          <div className="flex gap-2 items-center">
            <span className="text-gray-500 line-through">
              ₹{item.actualPrice}
            </span>
            <span className="text-red-500 font-semibold">
              {item.discount}% OFF
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section on Desktop: Action Buttons + Return Text */}
      <div className="flex flex-col md:ml-4 mt-2 md:mt-0 w-full md:w-auto md:self-end">
        {/* Action Buttons */}
        <div className="flex gap-2 items-center mb-2">
          <button
            onClick={() => decreaseQuantity(item.id, item.size)}
            className="px-3 py-1 sm:px-4 sm:py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => addToCart(item, item.size)}
            className="px-3 py-1 sm:px-4 sm:py-1 bg-gray-200 rounded"
          >
            +
          </button>
          {!isRemoving && (
            <button
              onClick={() => setRemoveConfirm(itemKey)}
              className="px-2 py-1 sm:px-3 sm:py-1 bg-pink-500 text-white rounded"
            >
              Remove
            </button>
          )}
        </div>

        {/* Remove Confirmation */}
        {isRemoving && (
          <div className="mt-2 p-3 md:p-4 border rounded bg-gray-50 text-xs sm:text-sm md:text-base text-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 w-full">
            <span>Are you sure you want to move this item from bag?</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  removeFromCart(item.id, item.size);
                  setRemoveConfirm(null);
                }}
                className="text-pink-500 font-semibold underline text-xs sm:text-sm md:text-base"
              >
                YES
              </button>
            </div>
          </div>
        )}

        {/* Return Info */}
        <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 text-center md:text-left">
          7 days return available
        </p>
      </div>
    </div>
  );
};

export default CartList;
