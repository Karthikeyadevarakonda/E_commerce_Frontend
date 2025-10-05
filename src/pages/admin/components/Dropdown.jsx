import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Dropdown = ({ label, options = [], value, setValue }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="font-semibold text-gray-700 mb-1 block">{label}</label>
      <button
        type="button"
        className="w-full border border-gray-500 rounded-md px-3 py-2 flex justify-between items-center bg-white text-sm shadow-sm  focus:outline-none  transition"
        onClick={() => setOpen(!open)}
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || "Select..."}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-20 mt-2 w-full bg-white border border-gray-400 rounded-md shadow-lg max-h-56 overflow-auto animate-fadeIn">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-3 py-2 cursor-pointer text-sm ${
                value === opt
                  ? "bg-pink-100 text-pink-600 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
