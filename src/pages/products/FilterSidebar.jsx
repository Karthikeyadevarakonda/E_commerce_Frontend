import { useState } from "react";

const FilterSidebar = ({
  filteredData = [],
  selectedBrands,
  setSelectedBrands,
  selectedColors,
  setSelectedColors,
  selectedCategories,
  setSelectedCategories,
  selectedDiscount,
  setSelectedDiscount,
  priceRange,
  setPriceRange,
}) => {
  const coloursAvailable = [
    ...new Set(filteredData.map((p) => p.colour.toLowerCase())),
  ].map(
    (lower) => filteredData.find((p) => p.colour.toLowerCase() === lower).colour
  );

  const brandsAvailable = [...new Set(filteredData.map((p) => p.brand))];
  const categoriesAvailable = [
    ...new Set(filteredData.map((p) => p.productType)),
  ];

  const discountRanges = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  const toggleSelection = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setSelectedDiscount(null);
    setPriceRange([0, 10000]);
  };

  return (
    <div className="p-6 w-1/2 bg-white shadow rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">FILTERS</h1>
        <button
          onClick={clearAllFilters}
          className="text-sm text-pink-600 hover:underline"
        >
          Clear All
        </button>
      </div>
      <hr className="text-gray-300" />

      {/* BRAND */}
      <section>
        <h2 className="font-medium text-gray-700 mb-2">BRAND</h2>
        <div className="flex flex-col gap-2">
          {brandsAvailable.length > 0 ? (
            brandsAvailable.map((brand, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleSelection(brand, selectedBrands, setSelectedBrands)
                  }
                />
                <span className="text-sm capitalize">{brand}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No brands available</p>
          )}
        </div>
        <hr className="my-4 text-gray-300" />
      </section>

      <section>
        <h2 className="font-medium text-gray-700 mb-2">PRICE</h2>
        <div className="flex flex-col gap-2">
          <span className="text-sm">
            ₹{priceRange[0]} - ₹{priceRange[1]}+
          </span>
          <input
            type="range"
            min={0}
            max={5000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-pink-200 accent-pink-400"
          />
        </div>
        <hr className="my-4 text-gray-300" />
      </section>

      {/* COLOUR */}
      <section>
        <h2 className="font-medium text-gray-700 mb-2">COLOUR</h2>
        <div className="flex flex-col gap-2">
          {coloursAvailable.length > 0 ? (
            coloursAvailable.map((colour, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: colour }}
                />
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={selectedColors.includes(colour)}
                  onChange={() =>
                    toggleSelection(colour, selectedColors, setSelectedColors)
                  }
                />
                <span className="text-sm capitalize">{colour}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No colours available</p>
          )}
        </div>
        <hr className="my-4 text-gray-300" />
      </section>

      {/* CATEGORY */}
      <section>
        <h2 className="font-medium text-gray-700 mb-2">CATEGORY</h2>
        <div className="flex flex-col gap-2">
          {categoriesAvailable.length > 0 ? (
            categoriesAvailable.map((cat, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={selectedCategories.includes(cat)}
                  onChange={() =>
                    toggleSelection(
                      cat,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
                <span className="text-sm capitalize">{cat}</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No categories available</p>
          )}
        </div>
        <hr className="my-4 text-gray-300" />
      </section>

      {/* DISCOUNT */}
      <section>
        <h2 className="font-medium text-gray-700 mb-2">DISCOUNT</h2>
        <div className="flex flex-col gap-2">
          {discountRanges.map((d, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="discount"
                className="cursor-pointer"
                value={d}
                checked={selectedDiscount === d}
                onChange={() => setSelectedDiscount(d)}
              />
              <span className="text-sm">{d}% and above</span>
            </label>
          ))}
        </div>
        <hr className="my-4 text-gray-300" />
      </section>
    </div>
  );
};

export default FilterSidebar;
