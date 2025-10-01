import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaSortUp, FaSortDown } from "react-icons/fa";
import { motion } from "framer-motion";

const PAGE_SIZE = 5;

const ProductTable = ({
  products,
  handleEdit,
  handleDelete,
  handleReset,
  setSidebarOpen,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const q = searchQuery.toLowerCase();
    return products.filter((p) => {
      return (
        p.productName?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        (typeof p.productType === "string" &&
          p.productType.toLowerCase() === q) ||
        (Array.isArray(p.gender) && p.gender.some((g) => g.toLowerCase() === q))
      );
    });
  }, [products, searchQuery]);

  // Sorting
  const sortedProducts = useMemo(() => {
    if (!sortConfig.key) return filteredProducts;
    return [...filteredProducts].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
        <div>
          <h2 className="text-lg font-semibold">All Products</h2>
          <p className="text-sm text-gray-500">
            A list of all products with details like name, brand, price and
            stock.
          </p>
        </div>

        {/* Search + Add Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 flex-1 md:flex-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={() => {
              handleReset();
              setSidebarOpen(true);
            }}
            className="bg-pink-500 text-white px-4 py-2 rounded-md shadow hover:bg-pink-600 transition text-sm whitespace-nowrap"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => requestSort("brand")}
              >
                Brand{" "}
                {sortConfig.key === "brand" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp className="inline" />
                  ) : (
                    <FaSortDown className="inline" />
                  ))}
              </th>
              <th
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() => requestSort("actualPrice")}
              >
                Price{" "}
                {sortConfig.key === "actualPrice" &&
                  (sortConfig.direction === "asc" ? (
                    <FaSortUp className="inline" />
                  ) : (
                    <FaSortDown className="inline" />
                  ))}
              </th>
              <th className="px-6 py-3 text-left">Discount</th>
              <th className="px-6 py-3 text-left">Sizes</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 flex items-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                        N/A
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.productName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.productType}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.brand}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    ₹{product.actualPrice}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {product.discount ? (
                      <span className="text-pink-600 font-medium">
                        {product.discount}%
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-1 text-xs bg-gray-100 rounded-md text-gray-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-lg flex gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-black/80"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-gray-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-500 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
