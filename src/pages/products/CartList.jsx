import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const CartList = ({ item, addToCart, decreaseQuantity, removeFromCart }) => {
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const itemKey = item.id + item.size;
  const isRemoving = removeConfirm === itemKey;

  return (
    <div
      key={itemKey}
      className="relative flex items-start gap-4 border-b border-gray-300 pb-4 mb-4 last:mb-0 last:border-0"
    >
      {isRemoving && (
        <button
          onClick={() => setRemoveConfirm(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      )}

      <input type="checkbox" className="mt-2" checked readOnly />
      <img
        src={item.image}
        alt={item.productName}
        className="w-32 h-44 object-cover rounded"
      />

      <div className="flex-1">
        <h1 className="font-semibold">{item.brand}</h1>
        <h2 className="text-black/70">{item.productName}</h2>
        <p className="text-xs text-gray-500">Sold by: {item.brand}</p>
        <p className="text-sm text-gray-500">Size: {item.size}</p>

        <div className="flex gap-2">
          <span className="text-sm text-gray-500 line-through">
            ₹{item.actualPrice}
          </span>
          <span className="text-sm text-red-500 font-semibold">
            {item.discount}% OFF
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => decreaseQuantity(item.id, item.size)}
            className="px-4 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => addToCart(item, item.size)}
            className="px-4 py-1 bg-gray-200 rounded"
          >
            +
          </button>

          {!isRemoving && (
            <button
              onClick={() => setRemoveConfirm(itemKey)}
              className="px-2 py-1 bg-pink-500 text-white rounded ml-4"
            >
              Remove
            </button>
          )}
        </div>

        {isRemoving && (
          <div className="mt-2 p-4 border rounded bg-gray-50 text-sm text-gray-800 flex justify-between items-center">
            <span>Are you sure you want to move this item from bag?</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  removeFromCart(item.id, item.size);
                  setRemoveConfirm(null);
                }}
                className="text-pink-500 font-semibold underline"
              >
                YES
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-1">7 days return available</p>
      </div>
    </div>
  );
};

export default CartList;
