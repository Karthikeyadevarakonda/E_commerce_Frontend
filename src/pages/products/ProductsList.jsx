import ProductCard from "./ProductCard";
import FilterButtons from "./FilterButtons";
import FilterInput from "./FilterInput";
import ClothesLoading from "./ClothesLoading";
import NoProducts from "./NoProducts";

const ProductsList = ({ filteredData, loading, error, value, setValue }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ClothesLoading duration={2000} interval={200} />
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="px-8 h-[238vh] shadow overflow-y-auto rounded-md">
      <FilterButtons value={value} setValue={setValue} />
      <FilterInput value={value} setValue={setValue} />

      {filteredData?.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-10">
          <NoProducts />
        </p>
      )}
    </div>
  );
};

export default ProductsList;
