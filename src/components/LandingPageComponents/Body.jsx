import { motion } from "framer-motion";
import Lady from "../../assets/lady.png";
import Men from "../../assets/men.png";
import { Link } from "react-router-dom";
import ClothingScroll from "./ClothingScroll";

const Body = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-pink-50 to-gray-50 overflow-hidden pt-10 sm:pt-24 lg:pt-10">
      <div className="max-w-5xl text-center relative z-20 px-4">
        <h1 className="text-[40px] sm:text-[70px] lg:text-[140px] xl:text-[150px] 2xl:text-[220px] font-extrabold tracking-widest text-pink-200 uppercase leading-tight">
          TrendCart
        </h1>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          The smoothest and most stylish way to shop, discover, and express your
          fashion identity online.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={"/register"}
            className="px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition text-sm sm:text-base"
          >
            Get Started
          </Link>
          <Link
            to={"/login"}
            className="px-6 py-3 border border-black text-black rounded-md shadow hover:bg-gray-100 transition text-sm sm:text-base"
          >
            SIGN IN
          </Link>
        </div>
      </div>

      {/* Mobile-only Clothing Scroll */}
      <div className="w-full mt-0 sm:hidden z-20">
        <ClothingScroll />
      </div>

      {/* Animated Lady Image (Left) */}
      <motion.img
        src={Lady}
        alt="Lady"
        className="absolute left-0 bottom-0 w-72 sm:w-88 z-10 object-contain hidden lg:block"
        initial={{ x: -300, opacity: 0, rotate: -10 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1.2,
        }}
      />

      {/* Animated Men Image (Right) */}
      <motion.img
        src={Men}
        alt="Men"
        className="absolute right-0 -bottom-10 w-72 sm:w-88 z-10 object-contain hidden lg:block"
        initial={{ x: 300, opacity: 0, rotate: 10 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1.2,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-gray-50 z-0"></div>
    </section>
  );
};

export default Body;
