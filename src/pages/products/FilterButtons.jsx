import { Icon } from "@iconify/react";
import { PiBabyBold, PiPantsLight, PiHoodieDuotone } from "react-icons/pi";
import { RiShirtFill } from "react-icons/ri";
import { GiSkirt } from "react-icons/gi";
import { MdClear } from "react-icons/md";

const filters = [
  { name: "men", icon: { type: "iconify", icon: "mdi:gender-male" } },
  { name: "women", icon: { type: "iconify", icon: "mdi:gender-female" } },
  { name: "kids", icon: { type: "react", icon: PiBabyBold } },
  { name: "unisex", icon: { type: "iconify", icon: "mdi:gender-transgender" } },
  { name: "roadstar", icon: { type: "iconify", icon: "mdi:car-sports" } },
  { name: "puma", icon: { type: "iconify", icon: "mdi:shoe-formal" } },
  { name: "wrogn", icon: { type: "iconify", icon: "mdi:tshirt-crew" } },
  { name: "pant", icon: { type: "react", icon: PiPantsLight } },
  { name: "shirt", icon: { type: "react", icon: RiShirtFill } },
  { name: "tshirt", icon: { type: "iconify", icon: "mdi:tshirt-crew" } },
  { name: "hoodie", icon: { type: "react", icon: PiHoodieDuotone } },
  { name: "skirt", icon: { type: "react", icon: GiSkirt } },
];

export default function FilterButtons({ value, setValue, clearFilter }) {
  return (
    <div className="flex flex-wrap gap-2 my-4 mx-2 sm:mx-0">
      {filters.map((filter) => (
        <button
          key={filter.name}
          onClick={() => setValue(filter.name)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors duration-200 ${
            value === filter.name
              ? "bg-slate-800 text-white border-gray-100"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {filter.icon.type === "iconify" ? (
            <Icon icon={filter.icon.icon} width={20} height={20} />
          ) : (
            <filter.icon.icon size={20} />
          )}
          {filter.name.toUpperCase()}
        </button>
      ))}

      <button
        onClick={() => setValue("")}
        className="flex items-center gap-2 px-3 py-1 rounded-full border bg-white text-gray-700 border-gray-300 transition-colors duration-200"
      >
        <MdClear size={18} /> CLEAR
      </button>
    </div>
  );
}
