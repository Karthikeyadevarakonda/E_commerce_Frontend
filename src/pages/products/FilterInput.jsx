import React from "react";

const FilterInput = ({ value, setValue }) => {
  return (
    <div className="my-4">
      <input
        onChange={(e) => setValue(e.target.value.toLowerCase().trim())}
        value={value}
        type="text"
        placeholder="Search for Shirts, Pants or Brands...."
        className="border border-gray-200 rounded-lg pl-4 h-10 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition"
      />
    </div>
  );
};

export default FilterInput;
