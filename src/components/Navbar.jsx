import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAuthAction = () => {
    if (user) {
      if (window.confirm("Are you sure you want to sign out?")) {
        logout();
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <header className="sticky top-0 z-50 flex flex-col w-full">
        {/* TOP NAV BELT */}
        <nav className="flex items-center gap-4 px-4 h-[60px] bg-amazon-navy text-white">
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center h-full px-2 border border-transparent hover:border-white transition-all cursor-pointer rounded-sm py-1">
            <Link to="/" className="flex items-center h-full pt-1.5">
              <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon" className="w-[95px] object-contain" />
            </Link>
          </div>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="hidden flex-1 md:flex h-10 rounded overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
            <select className="bg-gray-100 text-gray-700 px-3 text-xs outline-none border-r border-gray-300 w-auto hover:bg-gray-200 cursor-pointer">
              <option>All</option>
              <option>Electronics</option>
              <option>Computers</option>
            </select>
            <input 
              type="text" 
              placeholder="Search Amazon" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 text-black outline-none"
            />
            <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
                 <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          {/* ACCOUNT / LINKS */}
          <div className="flex items-center gap-1">
             <div 
              onClick={handleAuthAction}
              className="flex flex-col justify-center px-2 py-1 h-[50px] border border-transparent hover:border-white rounded-sm cursor-pointer"
            >
              <span className="text-[12px] leading-3 text-gray-300">
                Hello, {user ? user.name : "sign in"}
              </span>
              <span className="text-[14px] font-bold leading-4">
                {user ? "Sign Out" : "Accounts & Lists"}
              </span>
            </div>

            <div className="hidden sm:flex flex-col justify-center px-2 py-1 h-[50px] border border-transparent hover:border-white rounded-sm cursor-pointer">
              <span className="text-[12px] leading-3 text-gray-300">Returns</span>
              <span className="text-[14px] font-bold leading-4">& Orders</span>
            </div>

            {/* CART ICON */}
            <NavLink 
              to="/cart" 
              className="flex items-end px-2 py-1 h-[50px] border border-transparent hover:border-white rounded-sm cursor-pointer relative"
            >
              <div className="relative flex items-end">
                <svg width="34" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-auto">
                  <circle cx="9" cy="21" r="1.5" fill="currentColor"/><circle cx="20" cy="21" r="1.5" fill="currentColor"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span className="absolute -top-1 left-3.5 font-bold text-primary text-[15px]">
                  {totalItems}
                </span>
              </div>
              <span className="text-[14px] font-bold mb-1 ml-1 hidden sm:inline">Cart</span>
            </NavLink>
          </div>
        </nav>

        {/* BOTTOM NAV */}
        <div className="flex items-center gap-4 px-4 h-[40px] bg-amazon-nav text-white text-[14px] font-medium overflow-x-auto whitespace-nowrap hide-scrollbar">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-1 border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer font-bold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            All
          </button>
          <Link to="/deals" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer">Today's Deals</Link>
          <Link to="/customer-service" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer">Customer Service</Link>
          <Link to="/registry" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer">Registry</Link>
          <Link to="/giftcards" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer hidden sm:block">Gift Cards</Link>
          <Link to="/sell" className="border border-transparent hover:border-white px-2 py-1 rounded-sm cursor-pointer hidden sm:block">Sell</Link>
        </div>
      </header>
    </>
  );
}