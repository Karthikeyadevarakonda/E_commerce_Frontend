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

    if (selectedBrands.length)
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));

    if (selectedColors.length)
      filtered = filtered.filter((p) => selectedColors.includes(p.colour));

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
          false ||
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
      {/* Only show sidebar if not loading */}
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
