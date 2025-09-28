import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"; // Using react-icons

const FilterInput = ({ value, setValue }) => {
  const placeholders = [
    "Search for Shirts...",
    "Search for Pants...",
    "Search for Brands...",
    "Search for Shoes...",
    "Search for Hats...",
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-4 relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        onChange={(e) => setValue(e.target.value.toLowerCase().trim())}
        value={value}
        type="text"
        placeholder={currentPlaceholder}
        className="border border-gray-200 rounded-lg pl-10 h-10 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 transition"
      />
    </div>
  );
};

export default FilterInput;
