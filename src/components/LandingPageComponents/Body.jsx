import { motion } from "framer-motion";
import Lady from "../../assets/lady.png";
import Men from "../../assets/men.png";
import { Link } from "react-router-dom";
import ClothingScroll from "./ClothingScroll";
import { useAuth } from "../../utils/AuthContext"; // import AuthContext

const Body = () => {
  const { user } = useAuth(); // get the current user

  return (
    <section className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-pink-50 to-gray-50 overflow-hidden pt-10 sm:pt-10 lg:pt-2">
      <div className="max-w-5xl text-center relative z-20 px-4">
        <h1 className="text-[40px] sm:text-[70px] lg:text-[140px] xl:text-[150px] 2xl:text-[220px] font-extrabold tracking-widest text-pink-200 uppercase leading-tight">
          TrendCart
        </h1>

        <p className="mt-6 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          The smoothest and most stylish way to shop, discover, and express your
          fashion identity online.
        </p>

        <div className="mt-8 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={"/products"}
            className="px-4 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition text-sm sm:text-base"
          >
            Explore Fashion
          </Link>

          {/* Dynamic button */}
          {!user ? (
            <Link
              to={"/login"}
              className="px-8 py-3 border border-black text-black rounded-md shadow hover:bg-gray-100 transition text-sm sm:text-base"
            >
              SIGN IN
            </Link>
          ) : user.role === "ADMIN" ? (
            <Link
              to={"/admin/metrics"}
              className="px-8 py-3 border border-black text-black rounded-md shadow hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to={"/profile"}
              className="px-8 py-3 border border-black text-black rounded-md shadow hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Profile
            </Link>
          )}
        </div>
      </div>

      <div className="absolute -bottom-10 sm:bottom-10 flex justify-center w-full z-10 rounded-full">
        <div className="relative w-full sm:w-[600px] lg:w-[650px] overflow-hidden rounded-full">
          <div className="pointer-events-none rounded-full absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-pink-50 via-pink-50 to-transparent z-20"></div>
          <div className="pointer-events-none rounded-full absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-pink-50 via-pink-50 to-transparent z-20"></div>
          <ClothingScroll />
        </div>
      </div>

      <motion.img
        src={Lady}
        alt="Lady"
        className="absolute left-0 bottom-0 w-72 sm:w-88 z-20 object-contain hidden lg:block"
        initial={{ x: -300, opacity: 0, rotate: -10 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1.2,
        }}
      />

      <motion.img
        src={Men}
        alt="Men"
        className="absolute right-0 -bottom-10 w-72 sm:w-88 z-20 object-contain hidden lg:block"
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
