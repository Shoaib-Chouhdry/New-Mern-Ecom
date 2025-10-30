
import { useState } from "react";
import { Link } from "react-router-dom";

// Sample menu items
const menuItems = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Shop", path: "/shop" },
  { id: 3, label: "Services", path: "/services" },
  { id: 4, label: "Contact", path: "/contact" },
];

const MobileMenu = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setMobileMenu(!mobileMenu)}
        className="text-2xl p-4"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white text-black z-50 flex flex-col items-center transition-opacity duration-300 ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMobileMenu(false)}
          className="absolute top-5 right-5 text-3xl"
        >
          ✕
        </button>

        {/* Menu Content */}
        <div className="w-full max-w-md flex flex-col py-20 space-y-6 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="text-black text-lg font-medium hover:text-gray-600 transition"
              onClick={() => setMobileMenu(false)} // Close menu on item click
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
