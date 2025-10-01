// src/components/ui/CheckboxGroup.jsx
const CheckboxGroup = ({ label, options = [], selected = [], setSelected }) => {
  const toggle = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div>
      <label className="font-semibold text-gray-700 mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, idx) => (
          <button
            key={`${opt}-${idx}`} // ✅ unique key
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition 
      ${
        selected.includes(opt)
          ? "bg-pink-500 text-white border-pink-500 shadow-sm"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
