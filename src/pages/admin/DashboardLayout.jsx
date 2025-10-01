import React, { useState } from "react";
import { Home, Box, Menu, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/metrics" },
    { name: "Products", icon: <Box size={20} />, path: "/admin/products" },
  ];

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
        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 hover:bg-gray-200 text-gray-700"
            >
              {item.icon}
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
        <button className="flex items-center gap-3 p-3 hover:bg-gray-200 text-gray-700 mb-4">
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
