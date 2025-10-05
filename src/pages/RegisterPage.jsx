import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useApi from "../utils/useApi";
import { useAuth } from "../utils/AuthContext";

const RegisterPage = () => {
  const { postData } = useApi(import.meta.env.VITE_BASE_URL);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", role: "USER" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // call backend register
    const res = await postData("/auth/register", form);

    if (res?.message === "Registration Success") {
      // immediately login after signup
      const loginRes = await postData("/auth/login", {
        email: form.email,
        password: form.password,
      });

      if (loginRes?.token) {
        login(loginRes.token);

        // redirect based on role
        const decoded = JSON.parse(atob(loginRes.token.split(".")[1]));
        if (decoded.role === "ADMIN") {
          navigate("/admin/metrics");
        } else {
          navigate("/products");
        }
      }
    } else {
      alert("Registration failed, try again.");
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
          ✨Create Account
        </h2>

        <p className="text-center text-slate-600 mb-6 text-sm sm:text-base">
          Join TrendCart and start exploring the latest fashion trends today.
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
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
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
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          {/* Role dropdown (optional) */}
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
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
