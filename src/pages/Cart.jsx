import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) return (
    <div className="bg-bg-light min-h-[calc(100vh-64px)] py-12 px-6 flex items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm border border-gray-100">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-6 text-gray-300">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <h3 className="mb-3 text-2xl font-bold text-text-main">Your cart is empty</h3>
        <p className="mb-8 text-text-muted">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="inline-block w-full rounded-full bg-primary px-8 py-3.5 font-bold text-white transition-all duration-200 hover:bg-primary-hover hover:shadow-lg active:scale-95">
          Browse Products
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-light py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 flex items-center gap-3 text-3xl font-extrabold text-text-main md:text-4xl">
          Shopping Cart 
          <span className="flex h-8 min-w-[2rem] items-center justify-center rounded-full bg-primary px-3 text-sm font-bold text-white shadow-md">
            {totalItems}
          </span>
        </h1>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* ITEMS */}
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              {cart.map((item) => <CartItem key={item.id} item={item} />)}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="w-full lg:w-[380px] lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-border-light">
              <h3 className="mb-6 text-xl font-extrabold text-text-main">Order Summary</h3>
              
              <div className="mb-4 flex justify-between text-text-muted">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium text-text-main">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="mb-6 flex justify-between text-text-muted">
                <span>Shipping Estimate</span>
                <span className="font-bold text-green-600">Free 🚚</span>
              </div>
              
              <hr className="my-6 border-border-light" />
              
              <div className="mb-8 flex justify-between text-xl font-extrabold text-text-main">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              
              <Link to="/checkout" className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 font-bold text-white transition-all duration-200 hover:bg-primary-hover hover:shadow-lg active:scale-[0.98]">
                Proceed to Checkout →
              </Link>
              
              <Link to="/products" className="mt-4 block text-center text-sm font-medium text-text-muted hover:text-primary transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}