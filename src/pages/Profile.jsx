// pages/profile/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaStar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import useApi from "../utils/useApi";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    fetchData,
    loading,
    error,
    data: orders,
  } = useApi(`${import.meta.env.VITE_BASE_URL}/api/orders`);
  const [activeTab, setActiveTab] = useState("orders");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    if (user) fetchData(`/user/${user.id}`);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Past Orders", icon: <FaBoxOpen />, tab: "orders" },
    { name: "Products", icon: <FaBoxOpen />, path: "/products" },
    { name: "Cart", icon: <FaShoppingCart />, path: "/cart" },
  ];

  const totalItems = orders
    ? orders.reduce(
        (acc, order) =>
          acc + order.products.reduce((sum, p) => sum + p.quantity, 0),
        0
      )
    : 0;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "shipped":
        return <FaTruck className="text-blue-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const displayedOrders = !showAllOrders && orders ? orders.slice(-3) : orders;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
      {/* Mobile Menu Button */}
      <button
        className="absolute top-4 left-4 z-200 md:hidden bg-white p-2 rounded-lg shadow-md"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isMenuOpen || window.innerWidth >= 768 ? 0 : -250 }}
        transition={{ duration: 0.4 }}
        className={`fixed md:static top-0 left-0 h-full md:h-auto z-40 w-64 bg-white shadow-xl flex flex-col rounded-r-xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Profile Header */}
        <div className="p-6 flex flex-col items-center gap-2 border-b border-gray-200">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
            <FaUser className="text-pink-500 text-3xl" />
          </div>
          <p className="font-bold text-lg text-gray-800 text-center break-all">
            {user?.email.split("@")[0]}
          </p>
          <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-lg">
            {user?.role}
          </span>
        </div>

        <nav className="flex flex-col mt-4 gap-1 flex-1 px-2">
          {menuItems.map((item) =>
            item.tab ? (
              <motion.button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.tab);
                  setIsMenuOpen(false);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-300 text-sm sm:text-base
                  ${
                    activeTab === item.tab
                      ? "bg-pink-50 text-pink-600 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {item.icon}
                {item.name}
                {activeTab === item.tab && (
                  <span className="absolute right-3 text-xs bg-pink-500 text-white rounded-full px-2 py-0.5">
                    {orders?.length || 0}
                  </span>
                )}
              </motion.button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="relative flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
              >
                {item.icon}
                {item.name}
              </Link>
            )
          )}

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-auto flex items-center gap-3 p-3 hover:bg-gray-100 rounded text-red-500 font-semibold text-sm sm:text-base"
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </nav>
      </motion.div>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto md:ml-0 ml-0 mt-16 md:mt-0">
        {/* Top Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 sm:p-6 shadow-md gap-3 sm:gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
              Welcome back, {user?.email.split("@")[0]}!
            </h2>
            <p className="text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
              <FaStar className="text-yellow-400" /> Premium Member
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4"
          >
            <div className="bg-gradient-to-r from-pink-100 to-pink-50 shadow rounded-lg p-3 sm:p-4 text-center w-28 sm:w-32">
              <p className="text-gray-500 text-xs sm:text-sm">Total Orders</p>
              <p className="font-bold text-base sm:text-lg text-pink-600">
                {orders ? orders.length : 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 shadow rounded-lg p-3 sm:p-4 text-center w-28 sm:w-32">
              <p className="text-gray-500 text-xs sm:text-sm">Total Items</p>
              <p className="font-bold text-base sm:text-lg text-yellow-600">
                {totalItems}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tabs Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-auto">
          {activeTab === "orders" && (
            <>
              <h3 className="font-semibold text-lg sm:text-xl mb-4 text-gray-700 flex items-center gap-2">
                <FaBoxOpen className="text-pink-500" /> Your Past Orders
              </h3>

              {loading && <p>Loading orders...</p>}
              {error && <p className="text-red-500">Failed to load orders</p>}
              {!loading && orders && orders.length === 0 && (
                <p className="text-gray-500">No orders yet.</p>
              )}

              <div className="flex flex-col gap-4 sm:gap-6">
                <AnimatePresence>
                  {displayedOrders &&
                    displayedOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border-l-4 border-gray-200 hover:border-pink-500 transition-all"
                      >
                        {/* Status Indicator */}
                        <div
                          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        />

                        {/* Order Info */}
                        <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                          <div className="flex flex-col gap-1 text-sm sm:text-base">
                            <p className="font-semibold text-gray-700">
                              Order ID:{" "}
                              <span className="font-normal text-gray-500 break-all">
                                {order.id}
                              </span>
                            </p>
                            <p className="flex items-center gap-1 text-gray-600">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </p>
                          </div>

                          {/* Product Thumbnails */}
                          <div className="flex gap-2 overflow-x-auto mt-2 md:mt-0 pb-1">
                            {order.products.map((p) => (
                              <div
                                key={p.id}
                                className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center"
                              >
                                <img
                                  src={p.product?.image || "/placeholder.png"}
                                  alt={p.product?.productType}
                                  className="object-contain w-full h-full"
                                />
                                <span className="absolute top-0 right-0 text-[10px] sm:text-xs font-bold text-white bg-pink-500 rounded-full px-1.5 py-[1px]">
                                  {p.quantity}x
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* See more / See less button */}
              {orders && orders.length > 3 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAllOrders(!showAllOrders)}
                    className="text-pink-600 font-medium hover:underline text-sm sm:text-base"
                  >
                    {showAllOrders ? "See less ▲" : "See more ▼"}
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "cart" && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 flex items-center gap-2">
                <FaShoppingCart className="text-pink-500" /> Your Cart
              </h3>
              <p className="text-gray-500 mt-2">Cart details coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
