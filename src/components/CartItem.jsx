import React from "react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center bg-surface rounded-2xl p-4 mb-4 shadow-sm border border-border-light transition-shadow hover:shadow-md">
      {/* IMAGE */}
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-24 h-24 object-contain bg-gray-50 rounded-xl p-2 mix-blend-multiply"
      />

      {/* INFO */}
      <div className="flex-1 text-center sm:text-left self-stretch flex flex-col justify-center">
        <h4 className="text-sm font-semibold text-text-main line-clamp-2 mb-1">{item.title}</h4>
        <p className="font-extrabold text-primary text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-xs text-text-muted mt-0.5">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-9">
          <button
            className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors active:bg-gray-100"
            onClick={() => decreaseQty(item.id)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-bold text-gray-700">{item.quantity}</span>
          <button
            className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors active:bg-gray-100"
            onClick={() => increaseQty(item.id)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}