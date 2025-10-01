import FilterSidebar from "./FilterSidebar";
import ProductsList from "./ProductsList";
import { useEffect, useState } from "react";
import useApi from "../../utils/useApi";

const ProductsPage = () => {
  const {
    data: products,
    fetchData,
    loading,
    error,
  } = useApi("http://localhost:7001/api/allProducts");

  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  useEffect(() => {
    fetchData("/");
  }, []);

  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    // Case-insensitive brand filtering
    if (selectedBrands.length) {
      const lowerSelectedBrands = selectedBrands.map((b) => b.toLowerCase());
      filtered = filtered.filter((p) =>
        lowerSelectedBrands.includes(p.brand?.toLowerCase())
      );
    }

    // Case-insensitive color filtering (optional)
    if (selectedColors.length) {
      const lowerSelectedColors = selectedColors.map((c) => c.toLowerCase());
      filtered = filtered.filter((p) =>
        lowerSelectedColors.includes(p.colour?.toLowerCase())
      );
    }

    // Category filtering (already enums, usually uppercase)
    if (selectedCategories.length)
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.productType)
      );

    // Discount filter
    if (selectedDiscount)
      filtered = filtered.filter((p) => p.discount >= selectedDiscount);

    // Price range filter
    if (priceRange)
      filtered = filtered.filter(
        (p) => p.actualPrice >= priceRange[0] && p.actualPrice <= priceRange[1]
      );

    // Search/filter by text input
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
    <div className="p-4 flex flex-row">
      {!loading && (
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
      )}

      <ProductsList
        filteredData={filteredData}
        loading={loading}
        error={error}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export default ProductsPage;
