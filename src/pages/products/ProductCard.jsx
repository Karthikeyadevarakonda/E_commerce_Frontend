// import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product: p }) => {
  //   const navigate = useNavigate();

  //   const handleClick = () => navigate(`/product/${product.id}`);

  const getDiscountPrice = (actualPrice, discount) =>
    Math.round(actualPrice * (1 - discount / 100));

  return (
    <div className="hover:shadow-xl">
      <div>
        <img src={p.image} alt="" />
      </div>

      <div className="p-3 flex flex-col">
        <h3 className="text-sm sm:text-xl font-medium line-clamp-2">
          {p.brand}
        </h3>
        <p className="text-xs sm:text-base text-gray-500 truncate">
          {p.productName}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-normal font-bold text-black">
            Rs. {getDiscountPrice(p.actualPrice, p.discount)}
          </span>
          {p.discount > 0 && (
            <span className="flex gap-2">
              <span className="text-xs line-through text-gray-400">
                Rs. {p.actualPrice}
              </span>
              <span className="text-xs text-amber-400">
                {"( " + p.discount + " % OFF)"}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
