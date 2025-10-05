import { useCallback } from "react";

const CheckboxGroup = ({ label, options = [], selected = [], setSelected }) => {
  // Ensure selected is always an array of strings
  const normalizedSelected = Array.isArray(selected)
    ? selected.map((v) => String(v).toUpperCase())
    : [];

  const toggle = useCallback(
    (value) => {
      const valUpper = String(value).toUpperCase();
      const newSelected = normalizedSelected.includes(valUpper)
        ? normalizedSelected.filter((v) => v !== valUpper)
        : [...normalizedSelected, valUpper];

      console.log(`[${label}] Toggled:`, valUpper);
      console.log(`[${label}] Previous selected:`, normalizedSelected);
      console.log(`[${label}] New selected:`, newSelected);

      setSelected(newSelected);
    },
    [setSelected, normalizedSelected, label]
  );

  return (
    <div>
      <label className="font-semibold text-gray-700 mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, idx) => {
          const optUpper = String(opt).toUpperCase();
          const isSelected = normalizedSelected.includes(optUpper);
          console.log(
            `[${label}] Rendering option:`,
            opt,
            "Selected:",
            isSelected
          );

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
