import { motion } from "framer-motion";
import { FaStar, FaHeart, FaTshirt } from "react-icons/fa";
import Lady from "../../assets/lady.png";
import Men from "../../assets/men.png";
import { Link } from "react-router-dom";
import ClothingScroll from "./ClothingScroll";
import { useAuth } from "../../utils/AuthContext";

const Body = () => {
  const { user } = useAuth();

  return (
    <section className="relative flex flex-col items-center bg-gradient-to-r from-pink-50 to-gray-50 overflow-hidden pt-16 sm:pt-10 lg:pt-2 2xl:pt-20 sm:min-h-screen">
      {/* 🌟 MOBILE BACKGROUND ANIMATIONS */}
      <div className="absolute inset-0 overflow-hidden sm:hidden z-0">
        {/* Floating gradient blobs */}
        <motion.div
          className="absolute top-10 left-[-30px] w-40 h-40 bg-pink-200/60 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-[-40px] w-48 h-48 bg-pink-300/50 rounded-full blur-2xl"
          animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating fashion icons */}
        {[FaHeart, FaStar, FaTshirt].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/70"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
              fontSize: `${28 + i * 6}px`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon />
          </motion.div>
        ))}

        {/* Soft shimmer gradient layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-pink-100/40 via-transparent to-gray-100/30"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="max-w-5xl text-center relative z-20 px-4">
        <h1 className="text-[40px] sm:text-[70px] lg:text-[140px] xl:text-[150px] font-extrabold tracking-widest text-pink-300 sm:text-pink-200 uppercase leading-tight">
          TrendCart
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          The smoothest and most stylish way to shop, discover, and express your
          fashion identity online.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to={"/products"}
            className="px-4 py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition text-sm sm:text-base"
          >
            Explore Fashion
          </Link>

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

        {/* 🧍‍♀️ & 🧍‍♂️ MOBILE DECOR IMAGES UNDER BUTTONS */}
        <div className="flex justify-center gap-4 mt-6 lg:hidden z-10">
          <motion.img
            src={Lady}
            alt="Lady"
            className="w-32 sm:w-40 object-contain"
            initial={{ y: 50, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              duration: 1.2,
              delay: 0.3,
            }}
          />
          <motion.img
            src={Men}
            alt="Men"
            className="w-32 sm:w-40 object-contain"
            initial={{ y: 50, opacity: 0, rotate: 5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              duration: 1.2,
              delay: 0.5,
            }}
          />
        </div>
      </div>

      {/* 🧥 CLOTHING SCROLL */}
      <div className="relative w-full flex justify-center mt-10 sm:mt-10 lg:mt-10 z-10 mb-6 sm:mb-0">
        <div className="relative w-[90%] sm:w-[600px] lg:w-[650px] overflow-hidden rounded-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-pink-50 via-pink-50 to-transparent z-20 hidden sm:block"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-pink-50 via-pink-50 to-transparent z-20 hidden sm:block"></div>

          <ClothingScroll />
        </div>
      </div>

      {/* 🧍‍♀️ DESKTOP DECOR IMAGES */}
      <motion.img
        src={Lady}
        alt="Lady"
        className="absolute left-0 bottom-0 w-56 sm:w-72 lg:w-88 z-20 object-contain hidden lg:block"
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
        className="absolute right-0 bottom-0 w-56 sm:w-72 lg:w-88 z-20 object-contain hidden lg:block"
        initial={{ x: 300, opacity: 0, rotate: 10 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1.2,
        }}
      />

      {/* 🧍‍♀️ & 🧍‍♂️ MOBILE DECOR IMAGES */}

      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-gray-50 z-0"></div>
    </section>
  );
};

export default Body;
