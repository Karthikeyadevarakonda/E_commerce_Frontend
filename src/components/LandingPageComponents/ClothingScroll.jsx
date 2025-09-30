import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaTshirt,
  FaShoePrints,
  FaHatCowboy,
  FaSocks,
  FaGlasses,
} from "react-icons/fa";
import { GiHoodie, GiDress, GiBackpack } from "react-icons/gi";

const clothingItems = [
  { name: "T-Shirt", icon: <FaTshirt />, color: "text-slate-900" },
  { name: "Hoodie", icon: <GiHoodie />, color: "text-slate-900" },
  { name: "Hat", icon: <FaHatCowboy />, color: "text-slate-900" },
  { name: "Shoes", icon: <FaShoePrints />, color: "text-slate-900" },
  { name: "Dress", icon: <GiDress />, color: "text-slate-900" },
  { name: "Socks", icon: <FaSocks />, color: "text-slate-900" },
  { name: "Backpack", icon: <GiBackpack />, color: "text-slate-900" },
  { name: "Glasses", icon: <FaGlasses />, color: "text-slate-900" },
];

export default function ClothingScroll() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-8 sm:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-slate-500">
            Clothing Collection
          </h2>
        </motion.div>

        <div className="relative overflow-x-auto scrollbar-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="inline-flex space-x-4 sm:space-x-6 animate-scroll-left"
          >
            {[...clothingItems, ...clothingItems].map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                className="flex-shrink-0"
              >
                <div className="w-20 h-20 sm:w-20 sm:h-20 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center mb-1 sm:mb-2">
                    {React.cloneElement(item.icon, {
                      className: `w-full h-full ${item.color}`,
                    })}
                  </div>
                  <div className="text-xs sm:text-xs font-medium text-gray-700 text-center truncate px-2">
                    {item.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-left {
          animation: scroll-left 35s linear infinite;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (max-width: 640px) {
          .animate-scroll-left {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  );
}
