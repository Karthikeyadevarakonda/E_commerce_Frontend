import { useEffect, useState } from "react";
import useApi from "../../utils/useApi";
import ProductCard from "./ProductCard";
import FilterButtons from "./FilterButtons";
import FilterInput from "./FilterInput";

const ProductsList = () => {
  const {
    data: products,
    fetchData,
    loading,
    error,
  } = useApi("http://localhost:7001/api/allProducts");

  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData("/");
  }, []);

  useEffect(() => {
    if (products) {
      setFilteredData(
        products.filter(
          (item) =>
            item.productType.toLowerCase().includes(value) ||
            item.brand.toLowerCase().includes(value) ||
            item.gender.some((g) => g.toLowerCase().includes(value))
        )
      );
    }
  }, [value, products]);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="p-8 ">
      <FilterButtons value={value} setValue={setValue} />

      <FilterInput value={value} setValue={setValue} />

      {filteredData?.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">No products found.</p>
      )}
    </div>
  );
};

export default ProductsList;
