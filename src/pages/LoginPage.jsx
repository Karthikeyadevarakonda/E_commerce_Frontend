import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../utils/useApi";
import { useAuth } from "../utils/AuthContext";

const LoginPage = () => {
  const { postData } = useApi("http://localhost:7001");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await postData("/auth/login", form);

    if (res?.token) {
      login(res.token);

      // redirect based on role
      const decoded = JSON.parse(atob(res.token.split(".")[1]));
      if (decoded.role === "ADMIN") navigate("/admin/metrics");
      else navigate("/profile");
    } else {
      alert("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <section className="h-fit sm:min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-gray-100 sm:px-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20"></div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl sm:shadow-2xl sm:rounded-md p-8 sm:p-11 relative sm:z-10 sm:border-t-3 sm:border-slate-800">
        <h2 className="text-[27px] sm:text-3xl font-extrabold text-center text-slate-800 mb-4">
          ✨Login
        </h2>

        <p className="text-center text-slate-600 mb-6 text-sm sm:text-base">
          Welcome back! Login to continue exploring TrendCart.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-pink-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
