import React from "react";
import { useState } from "react";

const Address = () => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
    phone: "",
  });
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shipping Address
      </h2>
      <form className="space-y-5">
        <input
          type="text"
          placeholder="Full Name"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
        />
        <input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
        />
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
          />
          <input
            type="text"
            placeholder="Zip / Postal Code"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            className="w-32 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
          />
        </div>
        <input
          type="text"
          placeholder="Phone Number"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white p-3 rounded font-semibold hover:bg-pink-600 transition"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default Address;
