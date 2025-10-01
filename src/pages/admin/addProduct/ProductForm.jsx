// src/components/admin/ProductForm.jsx
import React from "react";
import Dropdown from "../components/Dropdown";
import CheckboxGroup from "../components/CheckboxGroup";

const PRODUCT_TYPES = [
  "SHIRT",
  "PANT",
  "TSHIRT",
  "DRESS",
  "SKIRT",
  "JEANS",
  "JACKET",
  "SWEATER",
  "HOODIE",
  "SHORTS",
  "SUIT",
  "INNERWEAR",
  "ACTIVEWEAR",
  "SWIMWEAR",
  "FOOTWEAR",
];
const GENDERS = ["MEN", "WOMEN", "UNISEX", "KIDS"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductForm = ({
  form,
  setForm,
  handleSubmit,
  handleReset,
  editingId,
  loading,
}) => {
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const parsed = value === "" ? "" : Number(value);
    if (value === "" || !isNaN(parsed)) {
      setForm({ ...form, [name]: parsed === "" ? "" : parsed });
    }
  };

  return (
    <div className="bg-white px-4 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-sm text-gray-500">
          Fill in the details below to {editingId ? "update" : "create"} a
          product.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            placeholder="e.g., Air Jordan 1"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
        </div>

        {/* Product Type Dropdown */}
        <Dropdown
          label="Product Type"
          options={PRODUCT_TYPES}
          value={form.productType}
          setValue={(v) => setForm({ ...form, productType: v })}
        />

        {/* Image */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Paste product image link"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Brand
          </label>
          <input
            type="text"
            value={form.brand.toUpperCase()}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value.toUpperCase() })
            }
            placeholder="e.g., NIKE"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
        </div>

        {/* Gender */}
        <CheckboxGroup
          label="Gender"
          options={GENDERS}
          selected={form.gender}
          setSelected={(vals) => setForm({ ...form, gender: vals })}
        />

        {/* Sizes */}
        <CheckboxGroup
          label="Sizes"
          options={SIZES}
          selected={form.sizes}
          setSelected={(vals) => setForm({ ...form, sizes: vals })}
        />

        {/* Numeric Fields */}
        {["rating", "viewCount", "actualPrice", "discount"].map((field) => (
          <div key={field}>
            <label className="font-semibold text-gray-700 mb-1 block">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              inputMode="decimal"
              name={field}
              value={form[field]}
              onChange={handleNumericChange}
              placeholder="Enter a number"
              className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
            />
          </div>
        ))}

        {/* Labels */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Labels (comma separated)
          </label>
          <input
            type="text"
            value={form.labels.join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                labels: e.target.value.split(",").map((v) => v.trim()),
              })
            }
            placeholder="e.g., casual, new, trending"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
        </div>

        {/* Colour */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Colour
          </label>
          <input
            type="text"
            value={form.colour}
            onChange={(e) => setForm({ ...form, colour: e.target.value })}
            placeholder="e.g., Red"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-pink-500 text-white py-2.5 px-4 rounded-md font-semibold text-sm shadow hover:bg-pink-600 transition disabled:opacity-50"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-md font-semibold text-sm hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
