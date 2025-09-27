import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Squares2X2Icon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + slogan */}
          <div className="flex flex-col leading-tight">
            <span className="text-3xl font-bold text-rose-600 font-poppins">
              Trendcart
            </span>
            <span className="text-sm text-gray-400 font-script">
              fashion first
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center font-medium">
            <a
              href="/products"
              className="flex items-center hover:text-amber-400"
            >
              <Squares2X2Icon className="h-5 w-5 mr-1" /> Products
            </a>
            <a
              href="/dashboard"
              className="flex items-center hover:text-amber-400"
            >
              <HomeIcon className="h-5 w-5 mr-1" /> Dashboard
            </a>
            <a
              href="/profile"
              className="flex items-center hover:text-amber-400"
            >
              <UserIcon className="h-5 w-5 mr-1" /> Profile
            </a>
            <a href="/login" className="flex items-center hover:text-amber-400">
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Login
            </a>
            <a
              href="/signup"
              className="flex items-center hover:text-amber-400"
            >
              <UserIcon className="h-5 w-5 mr-1" /> Register
            </a>
            <a href="/cart" className="flex items-center hover:text-amber-400">
              <ShoppingCartIcon className="h-5 w-5 mr-1" /> Cart
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-4 pt-2 pb-3 space-y-2">
          <a
            href="/products"
            className="flex items-center hover:text-amber-400"
          >
            <Squares2X2Icon className="h-5 w-5 mr-2" /> Products
          </a>
          <a
            href="/dashboard"
            className="flex items-center hover:text-amber-400"
          >
            <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
          </a>
          <a href="/profile" className="flex items-center hover:text-amber-400">
            <UserIcon className="h-5 w-5 mr-2" /> Profile
          </a>
          <a href="/login" className="flex items-center hover:text-amber-400">
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" /> Login
          </a>
          <a href="/signup" className="flex items-center hover:text-amber-400">
            <UserIcon className="h-5 w-5 mr-2" /> Register
          </a>
          <a href="/cart" className="flex items-center hover:text-amber-400">
            <ShoppingCartIcon className="h-5 w-5 mr-2" /> Cart
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
