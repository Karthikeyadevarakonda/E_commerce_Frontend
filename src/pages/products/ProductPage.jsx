import FilterSidebar from "./FilterSidebar";
import ProductsList from "./ProductsList";
import { useEffect, useState } from "react";
import useApi from "../../utils/useApi";
import { FiFilter, FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const ProductsPage = () => {
  const {
    data: products,
    fetchData,
    loading,
    error,
  } = useApi(`${import.meta.env.VITE_BASE_URL}/api/allProducts`);

  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchData("/");
  }, []);

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    if (selectedBrands.length) {
      const lowerSelectedBrands = selectedBrands.map((b) => b.toLowerCase());
      filtered = filtered.filter((p) =>
        lowerSelectedBrands.includes(p.brand?.toLowerCase())
      );
    }

    if (selectedColors.length) {
      const lowerSelectedColors = selectedColors.map((c) => c.toLowerCase());
      filtered = filtered.filter((p) =>
        lowerSelectedColors.includes(p.colour?.toLowerCase())
      );
    }

    if (selectedCategories.length)
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.productType)
      );

    if (selectedDiscount)
      filtered = filtered.filter((p) => p.discount >= selectedDiscount);

    if (priceRange)
      filtered = filtered.filter(
        (p) => p.actualPrice >= priceRange[0] && p.actualPrice <= priceRange[1]
      );

    if (value)
      filtered = filtered.filter(
        (p) =>
          p.brand?.toLowerCase().includes(value.toLowerCase()) ||
          (typeof p.productType === "string" &&
            p.productType.toLowerCase() === value.toLowerCase()) ||
          (Array.isArray(p.gender) &&
            p.gender.some((g) => g.toLowerCase() === value.toLowerCase()))
      );

    setFilteredData(filtered);
  }, [
    products,
    selectedBrands,
    selectedColors,
    selectedCategories,
    selectedDiscount,
    priceRange,
    value,
  ]);

  return (
    <div className="relative flex flex-col lg:flex-row lg:gap-1 p-0 lg:p-6">
      {/* 🔹 Sidebar (desktop only) */}
      {!loading && (
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-72">
            <FilterSidebar
              filteredData={products || []}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedDiscount={selectedDiscount}
              setSelectedDiscount={setSelectedDiscount}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        </div>
      )}

      {/* 🔹 Product List */}
      <div className="flex-1">
        {/* ✅ Mobile search bar */}
        <div className="lg:hidden px-4 pt-4 pb-2 sticky top-0 bg-white z-40 shadow-sm">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FiSearch className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search products..."
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
        </div>

        <ProductsList
          filteredData={filteredData}
          loading={loading}
          error={error}
          value={value}
          setValue={setValue}
        />
      </div>

      {/* 🔹 Floating Filter Button (mobile only) */}
      <button
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg lg:hidden z-50 hover:bg-pink-600 transition"
        onClick={() => setIsFilterOpen(true)}
      >
        <FiFilter size={22} />
      </button>

      {/* 🔹 Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-600 hover:text-black"
            >
              <IoClose size={28} />
            </button>
          </div>

          <FilterSidebar
            filteredData={products || []}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* ✅ Search button at bottom of overlay */}
          <button
            onClick={() => setIsFilterOpen(false)}
            className="w-full mt-6 bg-pink-500 text-white py-3 rounded-md font-medium hover:bg-pink-600 transition"
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
