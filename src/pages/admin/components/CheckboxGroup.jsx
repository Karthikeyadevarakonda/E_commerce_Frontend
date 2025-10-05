// src/components/ui/CheckboxGroup.jsx
import { useCallback } from "react";

const CheckboxGroup = ({ label, options = [], selected = [], setSelected }) => {
  const toggle = useCallback(
    (value) => {
      setSelected((prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((v) => v !== value)
          : [...prevSelected, value]
      );
    },
    [setSelected]
  );

  return (
    <div>
      <label className="font-semibold text-gray-700 mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, idx) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={`${opt}-${idx}`}
              type="button"
              onClick={() => toggle(opt)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition
                ${
                  isSelected
                    ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxGroup;
