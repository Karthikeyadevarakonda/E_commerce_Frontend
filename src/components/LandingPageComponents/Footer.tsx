import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-pink-200 uppercase">
            TrendCart
          </h2>
          <p className="text-gray-400 max-w-sm">
            TrendCart makes fashion seamless and fun—explore, shop, and express
            your style like never before.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 cursor-pointer">
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1 text-gray-400">
              <li>
                <span className="hover:text-pink-200 transition">About</span>
              </li>
              <li>
                <span className="hover:text-pink-200 transition">Careers</span>
              </li>
              <li>
                <span className="hover:text-pink-200 transition">Blog</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-1 text-gray-400">
              <li>
                <span className="hover:text-pink-200 transition">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-pink-200 transition">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="hover:text-pink-200 transition">FAQ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <p className="p-2 rounded-full bg-gray-800 hover:bg-pink-200 hover:text-gray-900 transition">
              <FaFacebookF />
            </p>
            <p className="p-2 rounded-full bg-gray-800 hover:bg-pink-200 hover:text-gray-900 transition">
              <FaTwitter />
            </p>
            <p className="p-2 rounded-full bg-gray-800 hover:bg-pink-200 hover:text-gray-900 transition">
              <FaInstagram />
            </p>
            <p className="p-2 rounded-full bg-gray-800 hover:bg-pink-200 hover:text-gray-900 transition">
              <FaLinkedinIn />
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} TrendCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
