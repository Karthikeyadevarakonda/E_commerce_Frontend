import { useEffect, useState } from "react";
import useApi from "../../../utils/useApi";
import toast from "react-hot-toast";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { motion, AnimatePresence } from "framer-motion";

const initialFormState = {
  productName: "",
  productType: "SHIRT",
  image: "",
  gender: [],
  rating: "",
  viewCount: "",
  actualPrice: "",
  discount: "",
  sizes: [],
  labels: [],
  brand: "",
  colour: "",
};

const Page = () => {
  const { data, fetchData, postData, putData, deleteData, loading } = useApi(
    `${import.meta.env.VITE_BASE_URL}/api/allProducts`
  );
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetchData("/");
      setProducts(Array.isArray(res?.data) ? res.data : []);
    };
    loadProducts();
  }, []);

  // Add / Update product
  const handleSubmit = async (payload, e, editingId) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await putData(`/${editingId}`, payload);
        if (res) toast.success("Product updated successfully!");
      } else {
        const res = await postData("/", payload);
        if (res) toast.success("Product added successfully!");
      }
      const refreshed = await fetchData("/");
      setProducts(Array.isArray(refreshed?.data) ? refreshed.data : []);
      handleReset();
      setSidebarOpen(false);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleEdit = (product) => {
    setForm({
      ...initialFormState,
      ...product,
      // Ensure gender and sizes are arrays; labels too
      gender: Array.isArray(product.gender) ? product.gender : [],
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      labels: Array.isArray(product.labels) ? product.labels : [],
    });

    setEditingId(product.id);
    setSidebarOpen(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const res = await deleteData(`/${id}`);
      if (res) toast.success("Product deleted successfully!");
      const refreshed = await fetchData("/");
      setProducts(Array.isArray(refreshed?.data) ? refreshed.data : []);
    }
  };

  // Reset form
  const handleReset = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 relative">
      {/* Products Table with integrated Add button */}
      <ProductTable
        products={products}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleReset={handleReset}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Sidebar Form */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full md:w-2/5 bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <ProductForm
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              editingId={editingId}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
