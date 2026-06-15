import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const inCart = cart.some((item) => item.id === Number(id));

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => r.json())
      .then((data) => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const renderStars = (rate = 0) =>
    "★".repeat(Math.round(rate)) + "☆".repeat(5 - Math.round(rate));

  if (loading) return (
    <div className="min-h-screen bg-bg-light py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="h-[480px] w-full animate-pulse rounded-3xl bg-gray-200" />
          <div className="flex flex-col pt-8">
            <div className="mb-4 h-4 w-1/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-6 h-10 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-8 h-6 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="mb-4 h-12 w-1/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!product?.id) return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-bg-light p-6">
      <h2 className="mb-6 text-3xl font-bold text-text-main">Product Not Found</h2>
      <button 
        onClick={() => navigate("/products")}
        className="rounded-full bg-primary px-8 py-3 font-bold text-white transition hover:bg-primary-hover active:scale-95"
      >
        Browse Products
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-light py-8 px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 text-sm font-medium text-text-muted">
          <a href="/" className="hover:text-primary transition-colors">Home</a> <span className="mx-2">›</span> 
          <a href="/products" className="hover:text-primary transition-colors">Products</a> <span className="mx-2">›</span> 
          <span className="capitalize text-text-main">{product.category}</span>
        </nav>
        
        <button 
          className="mb-8 flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-hover" 
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* IMAGE */}
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-white p-8 shadow-sm border border-border-light lg:h-[600px] lg:p-16">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[280px] object-contain w-full lg:max-h-[480px] transition-transform duration-500 hover:scale-105 mix-blend-multiply" 
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col pt-2 lg:pt-8">
            <span className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
              {product.category}
            </span>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-text-main lg:text-4xl">
              {product.title}
            </h1>

            <div className="mb-6 flex items-center gap-3">
              <span className="text-xl tracking-widest text-yellow-500">{renderStars(product.rating?.rate)}</span>
              <span className="flex items-center text-sm font-medium text-text-muted">
                <strong className="mr-1 text-text-main text-base">{product.rating?.rate?.toFixed(1)}</strong> 
                ({product.rating?.count} reviews)
              </span>
            </div>

            <div className="mb-8 border-b border-border-light pb-8">
              <p className="text-4xl font-black text-primary">${product.price?.toFixed(2)}</p>
              <p className="mt-1 text-sm font-medium text-text-muted">Inclusive of all taxes</p>
            </div>
            
            <p className="mb-10 text-base leading-relaxed text-text-muted lg:text-lg">
              {product.description}
            </p>

            <div className="mt-auto flex gap-4">
              <button
                className={`flex-1 rounded-xl py-4 text-base font-bold text-white shadow-md transition-all duration-200 active:scale-[0.98] ${
                  added 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-primary hover:bg-primary-hover hover:shadow-lg"
                }`}
                onClick={handleAdd}
              >
                {added ? "✓ Added to Cart!" : inCart ? "🛒 Add More" : "🛒 Add to Cart"}
              </button>
              <button 
                className="rounded-xl border-2 border-primary bg-transparent px-8 py-4 text-base font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white" 
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}