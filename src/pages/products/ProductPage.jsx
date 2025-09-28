import FilterSidebar from "./FilterSidebar";
import ProductsList from "./ProductsList";

const ProductsPage = () => {
  return (
    <div className="p-4 flex flex-row">
      <FilterSidebar />
      <ProductsList />
    </div>
  );
};

export default ProductsPage;
