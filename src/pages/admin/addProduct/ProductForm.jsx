// src/components/admin/ProductForm.jsx
import React, { useState } from "react";
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

const numericTypingRegex = /^$|^\d*\.?\d*$/; // allows "", "4", "4.", ".5", "4.5"

const ProductForm = ({
  form,
  setForm,
  handleSubmit,
  handleReset,
  editingId,
  loading,
}) => {
  const [errors, setErrors] = useState({});

  // Accept intermediate numeric input as string (so "." and "4." are allowed)
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (!numericTypingRegex.test(value)) return; // reject characters like "a", "1.2.3"
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Normalize on blur: clamp ranges, set precision
  const handleNumericBlur = (e) => {
    const { name, value } = e.target;

    if (value === "" || value === ".") {
      // empty/intermediate -> keep as empty string (user can choose to leave blank)
      setForm((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      setForm((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    if (name === "rating") {
      // clamp 0..5 and format to one decimal place
      const clamped = Math.max(0, Math.min(5, parsed));
      setForm((prev) => ({ ...prev, rating: clamped.toFixed(1) }));
    } else if (name === "viewCount") {
      const v = Math.max(0, Math.floor(parsed));
      setForm((prev) => ({ ...prev, viewCount: String(v) }));
    } else if (name === "actualPrice") {
      const price = Math.max(0, parsed);
      setForm((prev) => ({ ...prev, actualPrice: price.toFixed(2) }));
    } else if (name === "discount") {
      const disc = Math.max(0, Math.min(100, parsed));
      setForm((prev) => ({ ...prev, discount: disc.toFixed(2) }));
    } else {
      // fallback numeric formatting
      setForm((prev) => ({ ...prev, [name]: String(parsed) }));
    }
  };

  // Convert form (strings) into payload with proper numeric types & precision
  const preparePayload = (raw) => {
    const ratingRaw = raw.rating === "" ? 0 : parseFloat(raw.rating);
    const viewCountRaw =
      raw.viewCount === ""
        ? 0
        : parseInt(String(raw.viewCount).replace(/\D/g, ""), 10);
    const priceRaw = raw.actualPrice === "" ? 0 : parseFloat(raw.actualPrice);
    const discountRaw = raw.discount === "" ? 0 : parseFloat(raw.discount);

    // numeric payload with requested precision:
    const payload = {
      ...raw,
      productName: raw.productName?.trim() ?? "",
      productType: raw.productType ?? "",
      image: raw.image ?? "",
      brand: raw.brand ? raw.brand.toUpperCase() : "",
      gender: Array.isArray(raw.gender) ? raw.gender : [],
      sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
      labels: Array.isArray(raw.labels) ? raw.labels.filter(Boolean) : [],
      colour: raw.colour ?? "",
      // numbers:
      rating: parseFloat((Math.round(ratingRaw * 10) / 10).toFixed(1)), // e.g. 4.0 or 4.5 (numeric)
      viewCount: Math.max(0, Number.isNaN(viewCountRaw) ? 0 : viewCountRaw),
      actualPrice: parseFloat((priceRaw < 0 ? 0 : priceRaw).toFixed(2)),
      discount: parseFloat(
        (discountRaw < 0 ? 0 : Math.min(100, discountRaw)).toFixed(2)
      ),
    };

    // NOTE: If your backend *requires* a string like "4.0" for rating (instead of numeric 4),
    // change rating line to: rating: (Math.round(ratingRaw*10)/10).toFixed(1)
    // That returns a string "4.0".
    return payload;
  };

  const validatePayload = (p) => {
    const e = {};
    if (!p.productName) e.productName = "Product name is required.";
    if (!p.productType) e.productType = "Product type is required.";
    if (p.image && !/^https?:\/\/\S+\.\S+/.test(p.image))
      e.image = "Image must be a valid URL.";
    if (!p.brand) e.brand = "Brand is required.";
    if (!Array.isArray(p.gender) || p.gender.length === 0)
      e.gender = "Select at least one gender.";
    if (!Array.isArray(p.sizes) || p.sizes.length === 0)
      e.sizes = "Select at least one size.";
    if (p.rating < 0 || p.rating > 5)
      e.rating = "Rating must be between 0 and 5.";
    if (!Number.isInteger(p.viewCount) || p.viewCount < 0)
      e.viewCount = "View count must be an integer >= 0.";
    if (p.actualPrice < 0) e.actualPrice = "Price must be >= 0.";
    if (p.discount < 0 || p.discount > 100)
      e.discount = "Discount must be between 0 and 100.";
    return e;
  };

  // Internal submit handler: prepares payload, validates, then calls parent handler.
  const onSubmitInternal = (e) => {
    e.preventDefault();
    const normalized = preparePayload(form);
    const validation = validatePayload(normalized);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      // optionally scroll to first error
      return;
    }
    setErrors({});
    // Update parent form (helpful if parent reads the shared 'form' object later)
    setForm(normalized);

    // Call parent's handler with normalized payload as first arg.
    // Parent can accept (payload, event) or ignore args and use its own form state.
    handleSubmit(normalized, e, editingId);
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

      <form className="flex flex-col gap-4" onSubmit={onSubmitInternal}>
        {/* Product Name */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={form.productName ?? ""}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            placeholder="e.g., Air Jordan 1"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
          {errors.productName && (
            <p className="text-xs text-red-600 mt-1">{errors.productName}</p>
          )}
        </div>

        {/* Product Type Dropdown */}
        <Dropdown
          label="Product Type"
          options={PRODUCT_TYPES}
          value={form.productType ?? ""}
          setValue={(v) => setForm({ ...form, productType: v })}
        />
        {errors.productType && (
          <p className="text-xs text-red-600">{errors.productType}</p>
        )}

        {/* Image */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={form.image ?? ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Paste product image link"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
          {errors.image && (
            <p className="text-xs text-red-600 mt-1">{errors.image}</p>
          )}
        </div>

        {/* Brand */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Brand
          </label>
          <input
            type="text"
            value={form.brand ? String(form.brand).toUpperCase() : ""}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            placeholder="e.g., NIKE"
            className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
          />
          {errors.brand && (
            <p className="text-xs text-red-600 mt-1">{errors.brand}</p>
          )}
        </div>

        {/* Gender */}
        <CheckboxGroup
          label="Gender"
          options={GENDERS}
          selected={Array.isArray(form.gender) ? form.gender : []}
          setSelected={(vals) => setForm({ ...form, gender: vals })}
        />
        {errors.gender && (
          <p className="text-xs text-red-600">{errors.gender}</p>
        )}

        {/* Sizes */}
        <CheckboxGroup
          label="Sizes"
          options={SIZES}
          selected={Array.isArray(form.sizes) ? form.sizes : []}
          setSelected={(vals) => setForm({ ...form, sizes: vals })}
        />
        {errors.sizes && <p className="text-xs text-red-600">{errors.sizes}</p>}

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
              value={form[field] ?? ""}
              onChange={handleNumericChange}
              onBlur={handleNumericBlur}
              placeholder="Enter a number"
              className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-700"
            />
            {errors[field] && (
              <p className="text-xs text-red-600 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        {/* Labels */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Labels (comma separated)
          </label>
          <input
            type="text"
            value={
              Array.isArray(form.labels)
                ? form.labels.join(", ")
                : form.labels ?? ""
            }
            onChange={(e) =>
              setForm({
                ...form,
                labels: e.target.value
                  .split(",")
                  .map((v) => v.trim())
                  .filter(Boolean),
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
            value={form.colour ?? ""}
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
