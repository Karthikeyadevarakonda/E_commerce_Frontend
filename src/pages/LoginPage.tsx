import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="h-screen relative bg-gradient-to-b from-pink-200 to-gray-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20"></div>

      {/* White Form Panel */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl sm:rounded-md p-8 sm:p-12 sm:shadow-lg relative z-10 flex flex-col justify-between h-full sm:h-auto sm:border-t-3 sm:border-slate-800s">
        <div className="flex flex-col justify-between h-full">
          {/* Heading */}
          <div>
            <h2 className="text-[27px] sm:text-3xl font-extrabold text-center text-slate-800 mb-4">
              ✨Discover Trends
            </h2>

            <p className="text-center text-slate-600 mb-6 text-sm sm:text-base">
              Login to continue exploring TrendCart’s world of fashion ✨
            </p>

            {/* Form */}
            <form className="flex flex-col gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Username or Email"
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

              <div className="flex items-center justify-between text-sm text-slate-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-slate-600" />
                  Remember me
                </label>
                <a
                  href="/forgot-password"
                  className="hover:text-slate-800 transition"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                Login
              </button>

              <p className="sm:mt-6 text-center text-slate-600 text-sm">
                Don’t have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-slate-800 font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          {/* Signup Link */}
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
