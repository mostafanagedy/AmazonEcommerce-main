import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    onClose();
    if (window.confirm("Are you sure you want to sign out?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-[60] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR PANEL */}
      <div 
        className={`fixed top-0 left-0 h-full w-[365px] max-w-[85vw] bg-white z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className={`absolute top-4 -right-12 text-white font-bold text-3xl transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="bg-amazon-navy text-white p-4 pl-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-amazon-navy font-bold overflow-hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span className="text-[19px] font-bold">
            Hello, {user ? user.name : "sign in"}
          </span>
        </div>

        {/* MENU ITEMS */}
        <div className="py-2 pb-16">
          <div className="border-b border-gray-300 py-3">
            <h3 className="px-8 py-2 text-[18px] font-extrabold text-[#111]">Main Menu</h3>
            <ul className="text-[14px] text-[#111]">
              <li><Link to="/" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Home</Link></li>
              <li><Link to="/products" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Shop All Products</Link></li>
              <li><Link to="/cart" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Shopping Cart</Link></li>
              <li><Link to="/checkout" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Checkout</Link></li>
            </ul>
          </div>

          <div className="py-3">
            <h3 className="px-8 py-2 text-[18px] font-extrabold text-[#111]">Programs & Features</h3>
            <ul className="text-[14px] text-[#111]">
              <li><Link to="/deals" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Today's Deals</Link></li>
              <li><Link to="/customer-service" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Customer Service</Link></li>
              <li><Link to="/registry" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Registry</Link></li>
              <li><Link to="/giftcards" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Gift Cards</Link></li>
              <li><Link to="/sell" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Sell</Link></li>
              
              <div className="h-[1px] bg-gray-300 w-full my-2"></div>
              
              {user ? (
                <li><button onClick={handleSignOut} className="w-full text-left block px-8 py-3 hover:bg-gray-100 cursor-pointer text-[#111]">Sign Out</button></li>
              ) : (
                <li><Link to="/login" onClick={onClose} className="block px-8 py-3 hover:bg-gray-100 cursor-pointer">Sign In</Link></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
