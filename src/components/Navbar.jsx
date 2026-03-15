import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {

  const location = useLocation();
  const { cartItems, setIsCartOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/menu", label: "Menu" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full bg-[#F7F3EF] sticky top-0 z-50 border-b border-gray-200">

      <div className="w-full flex items-center justify-between px-4 md:px-10 lg:px-16 py-3">

        {/* Logo Text */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <span className="text-lg md:text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Shree Gurukripa
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10 text-[16px] font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className={`relative pb-1 group ${
                location.pathname === link.to ? "text-orange-500" : "hover:text-orange-500"
              }`}>
              {link.label}
              <span className={`absolute left-0 -bottom-[6px] h-[2px] bg-orange-500 transition-all duration-300 ${
                location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          <button onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-700 hover:text-orange-500">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Call Button — desktop only */}
          <a href="tel:+918871785707"
            className="hidden lg:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold">
            📞 Call Now
          </a>

          {/* Hamburger — mobile only */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-xl font-bold text-gray-700">
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden w-full bg-[#F7F3EF] border-t border-gray-200 px-4 pb-4">
          <div className="flex flex-col gap-2 pt-3">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium ${
                  location.pathname === link.to ? "bg-orange-500 text-white" : "hover:bg-orange-50"
                }`}>
                {link.label}
              </Link>
            ))}
            <a href="tel:+918871785707"
              className="mt-2 text-center bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold">
              📞 Call Now
            </a>
          </div>
        </div>
      )}

    </nav>
  );
}