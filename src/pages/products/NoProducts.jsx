import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
const NoProducts = () => {
  return (
    <p className="flex flex-col items-center justify-center mt-20 text-gray-500">
      <FontAwesomeIcon icon={faBoxOpen} className="text-6xl mb-4" />
      <span className="text-xl font-semibold">No products found</span>
      <span className="text-sm mt-1">
        Try clearing filters or search with different keywords
      </span>
    </p>
  );
};

export default NoProducts;
