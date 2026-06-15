import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", payment: "cod" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitted, setSubmitted] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.address.trim()) e.address = "Shipping address is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted({ ...form, total: totalPrice.toFixed(2) });
    setSuccess(true);
    clearCart();
  };

  // Empty cart
  if (cart.length === 0 && !success) return (
    <div className="min-h-[calc(100vh-64px)] bg-bg-light py-12 px-6 flex items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm border border-border-light">
        <h3 className="mb-2 text-2xl font-bold text-text-main">Nothing to checkout</h3>
        <p className="mb-6 text-text-muted">Your cart is empty.</p>
        <Link to="/products" className="inline-block w-full rounded-full bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-primary-hover active:scale-95">Browse Products</Link>
      </div>
    </div>
  );

  // Success screen
  if (success) return (
    <div className="min-h-screen bg-bg-light py-12 px-6">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center rounded-3xl bg-white p-10 text-center shadow-sm border border-border-light animate-[fadeIn_0.5s_ease]">
          <div className="mb-4 text-6xl">✅</div>
          <h2 className="mb-2 text-3xl font-extrabold text-text-main">Order Placed Successfully!</h2>
          <p className="mb-8 text-text-muted">Thank you <strong className="text-text-main">{submitted.name}</strong>! Your order is on its way.</p>
          
          <div className="w-full max-w-md rounded-2xl bg-gray-50 p-6 text-left border border-gray-100 mb-8">
            <div className="mb-3 flex justify-between border-b border-gray-200 pb-3">
              <span className="font-semibold text-text-muted">Name</span>
              <span className="font-medium text-text-main">{submitted.name}</span>
            </div>
            <div className="mb-3 flex justify-between border-b border-gray-200 pb-3">
              <span className="font-semibold text-text-muted">Email</span>
              <span className="font-medium text-text-main">{submitted.email}</span>
            </div>
            <div className="mb-3 flex justify-between border-b border-gray-200 pb-3">
              <span className="font-semibold text-text-muted">Address</span>
              <span className="font-medium text-text-main text-right break-words max-w-[60%]">{submitted.address}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-semibold text-text-muted">Total</span>
              <span className="text-xl font-extrabold text-primary">${submitted.total}</span>
            </div>
          </div>
          
          <Link to="/" className="inline-block rounded-full bg-primary px-8 py-3.5 font-bold text-white transition-all hover:bg-primary-hover active:scale-95">
             Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-light py-12 px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-extrabold text-text-main md:text-4xl">Checkout</h1>

        {/* PROGRESS STEPS */}
        <div className="mb-10 flex items-center justify-between lg:justify-start lg:gap-4 max-w-md mx-auto lg:mx-0">
          <div className="flex flex-col items-center gap-2 text-primary font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">✓</div>
            <span className="text-xs uppercase tracking-wider">Cart</span>
          </div>
          <div className="h-px w-12 bg-primary flex-1 lg:flex-none"></div>
          <div className="flex flex-col items-center gap-2 text-primary font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-bg-light text-primary">2</div>
            <span className="text-xs uppercase tracking-wider">Details</span>
          </div>
          <div className="h-px w-12 bg-gray-300 flex-1 lg:flex-none"></div>
          <div className="flex flex-col items-center gap-2 text-gray-400 font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-bg-light">3</div>
            <span className="text-xs uppercase tracking-wider text-gray-500">Done</span>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-start">
          {/* FORM */}
          <form className="flex-1 rounded-3xl bg-white p-6 shadow-sm border border-border-light md:p-8" onSubmit={handleSubmit} noValidate>
            <h3 className="mb-6 text-lg font-bold text-text-main"> Shipping Information</h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-text-main">Full Name</label>
                <input id="name" name="name" type="text"
                  placeholder="Mustafa Talaat"
                  className={`rounded-xl border p-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}`}
                  value={form.name} onChange={handleChange} />
                {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-text-main">Email Address</label>
                <input id="email" name="email" type="email"
                  placeholder="mustafa@example.com"
                  className={`rounded-xl border p-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}`}
                  value={form.email} onChange={handleChange} />
                {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mb-5">
              <label htmlFor="phone" className="text-sm font-semibold text-text-main">Phone (optional)</label>
              <input id="phone" name="phone" type="tel"
                placeholder="+20 1XX XXX XXXX"
                className="rounded-xl border border-gray-200 p-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={form.phone} onChange={handleChange} />
            </div>

            <div className="flex flex-col gap-1.5 mb-8">
              <label htmlFor="address" className="text-sm font-semibold text-text-main">Shipping Address</label>
              <textarea id="address" name="address" rows={3}
                placeholder="123 React St, Cairo, Egypt"
                className={`rounded-xl border p-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'}`}
                value={form.address} onChange={handleChange} />
              {errors.address && <span className="text-xs text-red-500 mt-1">{errors.address}</span>}
            </div>

            <h3 className="mb-6 text-lg font-bold text-text-main mt-8 border-t border-gray-100 pt-8">💳 Payment Method</h3>
            <div className="flex flex-col gap-1.5 mb-8">
              <label htmlFor="payment" className="text-sm font-semibold text-text-main">Select Payment</label>
              <select id="payment" name="payment" 
                className="rounded-xl border border-gray-200 p-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={form.payment} onChange={handleChange}>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="wallet"> Digital Wallet</option>
              </select>
            </div>

            <button type="submit" className="w-full rounded-xl bg-primary py-4 text-base font-bold text-white shadow-md transition-all hover:bg-primary-hover active:scale-[0.99]">
              🛒 Place Order — ${totalPrice.toFixed(2)}
            </button>
          </form>

          {/* ORDER CARD */}
          <div className="w-full lg:w-[350px] lg:sticky lg:top-24">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-border-light">
              <h3 className="mb-4 text-lg font-bold text-text-main">Your Order ({cart.length} items)</h3>
              
              <div className="flex max-h-80 flex-col gap-4 overflow-y-auto pr-2 mb-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <img src={item.image} alt={item.title} className="h-16 w-16 rounded-lg object-contain p-1 bg-gray-50 mix-blend-multiply border border-gray-100" />
                    <div className="flex-1">
                      <p className="line-clamp-2 text-xs font-semibold text-text-main mb-1">{item.title}</p>
                      <p className="text-sm font-bold text-primary">
                        ${item.price.toFixed(2)} <span className="text-xs font-medium text-gray-400">× {item.quantity}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="font-bold text-text-muted">Total</span>
                <span className="text-2xl font-extrabold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}