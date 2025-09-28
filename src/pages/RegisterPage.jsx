import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <section className="h-fit sm:min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-gray-100 sm:px-12 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20"></div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl sm:shadow-2xl sm:rounded-md p-8 sm:p-11 relative sm:z-10 sm:border-t-3 sm:border-slate-800">
        <h2 className="text-[27px] sm:text-3xl font-extrabold text-center text-slate-800 mb-4">
          ✨Create Account
        </h2>

        <p className="text-center text-slate-600 mb-6 text-sm sm:text-base">
          Join TrendCart and start exploring the latest fashion trends today.
        </p>

        <form className="flex flex-col gap-5">
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-slate-800 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
