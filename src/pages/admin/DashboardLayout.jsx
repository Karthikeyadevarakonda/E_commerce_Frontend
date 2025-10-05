import { useState } from "react";
import { Home, Box, Menu, LogOut, X } from "lucide-react";
import { FaUser, FaClipboardList } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // desktop width toggle
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // mobile toggle
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/metrics" },
    { name: "Products", icon: <Box size={20} />, path: "/admin/products" },
    { name: "Profile", icon: <FaUser size={20} />, path: "/profile" },
  ];

  if (user?.role === "ADMIN") {
    menuItems.splice(2, 0, {
      name: "Orders",
      icon: <FaClipboardList size={20} />,
      path: "/admin/orders",
    });
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={() => setMobileSidebarOpen(false)} // close on mobile
        className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-300
          ${
            isActive
              ? "bg-white text-pink-500 font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pink-500"
              : "text-gray-700 hover:bg-gray-200"
          }`}
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div
        className={`hidden sm:flex flex-col transition-all duration-300 shadow-md bg-gray-100 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 text-lg font-bold text-gray-800">
          {sidebarOpen ? "Admin Panel" : "AP"}
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-2 mt-2">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 hover:bg-gray-200 text-gray-700 mb-4"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 shadow-md transform transition-transform duration-300 sm:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-lg font-bold text-gray-800 flex justify-between items-center">
          Admin Panel
          <button
            className="text-gray-700"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-2 mt-2">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 hover:bg-gray-200 text-gray-700 mb-4"
        >
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 sm:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto sm:ml-0">
        <div className="flex items-center justify-between bg-gray-100 p-4 shadow-sm">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="text-gray-700 sm:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="text-gray-700 font-medium">Admin Dashboard</div>
        </div>
        <div className="p-6 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
