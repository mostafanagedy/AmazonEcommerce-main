import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const renderStars = (rate = 0) =>
    "★".repeat(Math.round(rate)) + "☆".repeat(5 - Math.round(rate));

  return (
    <div className="flex flex-col bg-white overflow-hidden p-2 pt-0 h-full">
      {/* CLICKABLE AREA → Product Detail */}
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col group">
        <div className="flex h-56 items-center justify-center bg-gray-50/50 p-6 mix-blend-multiply mb-2 cursor-pointer relative">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-48 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col px-1 flex-1">
          <h3 className="line-clamp-4 text-[15px] leading-tight text-[#0f1111] group-hover:text-[#c45500]">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <span className="text-[#de7a22] text-lg">{renderStars(product.rating?.rate)}</span>
            <span className="text-[#007185] hover:text-[#c45500] cursor-pointer text-xs">{product.rating?.count}</span>
          </div>
          <div className="mt-1 flex items-start">
            <span className="text-xs font-medium translate-y-1">$</span>
            <span className="text-[28px] font-medium tracking-tight text-[#0f1111]">
              {Math.floor(product.price)}
            </span>
            <span className="text-xs font-medium translate-y-1">
              {(product.price % 1).toFixed(2).substring(2)}
            </span>
          </div>
          <div className="text-sm mt-1">Prime</div>
          <div className="text-xs text-[#565959] mt-0.5">Delivery <span className="font-bold">Tomorrow</span></div>
        </div>
      </Link>

      {/* ADD TO CART BUTTON */}
      <div className="px-1 mt-3 pb-2">
        <button
          className={`w-full rounded-full py-2 text-sm shadow-[0_2px_5px_0_rgba(213,217,217,.5)] font-medium transition-all duration-200 border border-[#a88734] ${
            added 
              ? "bg-green-600 border-green-700 text-white hover:bg-green-700" 
              : "bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111]"
          }`}
          onClick={handleAdd}
        >
          {added ? "✓ Added to Cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}