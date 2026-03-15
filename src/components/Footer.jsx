import { FaFacebookF, FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#081B34] text-white pt-12">
      <div className="max-w-7xl mx-auto px-5 md:px-12">

        {/* Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">

          {/* Column 1 — Brand (full width on mobile) */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-[#FF7A18] mb-4">
              Shree Gurukripa
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm max-w-xs">
              Delicious vegetarian food in the heart of Indore. Experience
              authentic North Indian and Chinese cuisine.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#0F2747] rounded-full flex items-center justify-center hover:bg-orange-500 transition cursor-pointer">
                <FaFacebookF size={14} />
              </div>
              <div className="w-10 h-10 bg-[#0F2747] rounded-full flex items-center justify-center hover:bg-orange-500 transition cursor-pointer">
                <FaInstagram size={14} />
              </div>
              <div className="w-10 h-10 bg-[#0F2747] rounded-full flex items-center justify-center hover:bg-orange-500 transition cursor-pointer">
                <FaEnvelope size={14} />
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-[#FF7A18]">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition">About Us</Link></li>
              <li><Link to="/menu" className="hover:text-orange-400 transition">Menu</Link></li>
              <li><Link to="/gallery" className="hover:text-orange-400 transition">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 - Contact Us */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 text-[#FF7A18]">
              Contact Us
            </h3>
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="flex gap-3 items-start">
                <FaPhoneAlt className="text-orange-400 mt-0.5 shrink-0" />
                <span>+91 731 422 2202</span>
              </div>
              <div className="flex gap-3 items-start">
                <MdLocationOn className="text-orange-400 text-base mt-0.5 shrink-0" />
                <span>Vijay Nagar, Indore, Madhya Pradesh 452010</span>
              </div>
              <div className="flex gap-3 items-start">
                <MdAccessTime className="text-orange-400 text-base mt-0.5 shrink-0" />
                <span>Open till 12 AM</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Opening Hours */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-4 text-[#FF7A18]">
              Opening Hours
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Monday - Friday:</span>
                <span className="whitespace-nowrap">11 AM - 12 AM</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Saturday:</span>
                <span className="whitespace-nowrap">11 AM - 12 AM</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="shrink-0">Sunday:</span>
                <span className="whitespace-nowrap">11 AM - 12 AM</span>
              </div>
            </div>
            <div className="bg-[#5A2A14] text-orange-300 px-4 py-3 rounded-xl mt-5 text-sm">
              <span className="font-semibold">Price Range:</span> ₹200–₹400 per person
            </div>
          </div>

        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 pb-6 text-center text-gray-400">
          <p className="text-sm">© 2026 Shree Gurukripa Vijay Nagar. All rights reserved.</p>
          <p className="mt-1 text-xs text-gray-500">
            Best Vegetarian Restaurant in Indore | North Indian & Chinese Cuisine
          </p>
        </div>

      </div>
    </footer>
  );
}