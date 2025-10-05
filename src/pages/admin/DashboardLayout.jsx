import { useState } from "react";
import { Home, Box, Menu, LogOut } from "lucide-react";
import { FaUser, FaClipboardList } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-gray-100 shadow-md flex flex-col`}
      >
        <div className="p-4 text-lg font-bold text-gray-800">
          {sidebarOpen ? "Admin Panel" : "AP"}
        </div>
        <nav className="flex-1 flex flex-col gap-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "bg-white text-pink-500 font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-pink-500"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {item.icon}
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 hover:bg-gray-200 text-gray-700 mb-4"
        >
          <LogOut size={20} /> {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex items-center justify-between bg-gray-100 p-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700"
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
