import React, { useState } from "react";
import { useAddress } from "../../utils/AddressContext";
import toast from "react-hot-toast";

const Address = ({ setCurrentStep }) => {
  const { address, setAddress } = useAddress();
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!address.name) newErrors.name = "Full Name is required";
    if (!address.street) newErrors.street = "Street Address is required";
    if (!address.city) newErrors.city = "City is required";
    if (!address.zip || !/^\d{5,6}$/.test(address.zip))
      newErrors.zip = "Valid Zip/Postal Code is required";
    if (!address.phone || !/^\d{10}$/.test(address.phone))
      newErrors.phone = "Valid 10-digit phone number required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Address saved successfully! 🚚");
      setTimeout(() => {
        setCurrentStep(3);
      }, 1000);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shipping Address
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 transition ${
              errors.name
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-pink-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Street */}
        <div>
          <input
            type="text"
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 transition ${
              errors.street
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-pink-300"
            }`}
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street}</p>
          )}
        </div>

        {/* City + Zip */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 transition ${
                errors.city
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-pink-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div className="w-40">
            <input
              type="text"
              placeholder="Zip / Postal Code"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 transition ${
                errors.zip
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-pink-300"
              }`}
            />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
          </div>
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className={`w-full border p-3 rounded-xl focus:outline-none focus:ring-2 transition ${
              errors.phone
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-pink-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-3 rounded-xl font-semibold hover:bg-pink-600 transition"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;
