import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
  Squares2X2Icon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Products",
      path: "/products",
      icon: <Squares2X2Icon className="h-5 w-5" />,
    },
    {
      name: "Dashboard",
      path: "/admin/metrics",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    { name: "SignIn", path: "/login", icon: <UserIcon className="h-5 w-5" /> },
    {
      name: "SignUp",
      path: "/register",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-gray-900 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <span className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>
            Trendcart
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg mx-2 transition-colors duration-300
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
              >
                {item.icon}
                <span className={`${isOpen ? "inline" : "hidden"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome!</h1>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            <UserIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
          </div>
        </div>

        {/* Placeholder for content */}
        <div className="bg-white p-6 rounded-lg shadow-md h-full">
          Your content goes here...
        </div>
      </div>
    </div>
  );
};

export default Navbar;
