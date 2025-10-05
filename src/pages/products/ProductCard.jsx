import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product: p }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/product/${p.id}`);

  const getDiscountPrice = (actualPrice, discount) =>
    Math.round(actualPrice * (1 - discount / 100));

  return (
    <div
      className="hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={p.image}
          alt={p.name}
          className="w-full sm:rounded object-cover"
        />

        <p className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/70 px-1.5 py-0.5 rounded text-[10px] sm:text-sm font-medium">
          <span className="flex items-center gap-0.5">
            {p.rating} <FaStar color="green" size={10} />
          </span>
          <span className="text-gray-700 text-[10px] sm:text-sm">
            | {p.viewCount}
          </span>
        </p>
      </div>

      {/* TEXT CONTENT */}
      <div className="p-2 sm:p-3 flex flex-col">
        {/* Brand name */}
        <h3 className="text-xs sm:text-lg font-medium truncate sm:line-clamp-2">
          {p.brand}
        </h3>

        {/* Product name */}
        <p className="text-[10px] sm:text-sm text-gray-500 truncate sm:whitespace-normal sm:line-clamp-2">
          {p.productName}
        </p>

        {/* Price + Discount */}
        <div className="flex items-center gap-1 sm:gap-2 mt-1">
          <span className="text-xs sm:text-base font-bold text-black truncate">
            Rs. {getDiscountPrice(p.actualPrice, p.discount)}
          </span>

          {p.discount > 0 && (
            <span className="flex gap-1 sm:gap-2 items-center truncate">
              <span className="text-[10px] sm:text-xs line-through text-gray-400">
                Rs. {p.actualPrice}
              </span>
              <span className="text-[10px] sm:text-xs text-amber-400">
                ({p.discount}% OFF)
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
