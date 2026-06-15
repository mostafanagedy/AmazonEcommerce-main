import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((r) => r.json())
      .then((data) => { setFeatured(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#eaeded] min-h-screen relative pb-10">
      {/* HERO BANNER - Amazon Style */}
      <div className="relative w-full h-[600px] bg-gradient-to-r from-[#000000] to-[#3a4f66] flex justify-center">
        {/* Placeholder for an actual banner image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay max-w-[1500px] mx-auto"></div>
        {/* Gradient fade into background color at the bottom */}
        <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-[#eaeded] to-transparent z-10"></div>
      </div>

      {/* FEATURED PRODUCTS - Positioned over the banner */}
      <div className="relative z-20 -mt-80 px-4 md:px-6 mx-auto max-w-[1500px]">
        {/* Welcome Message Box */}
        <div className="bg-white p-3 text-center text-sm mb-6 max-w-full m-auto shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
          <p>You are on amazon.com. You can also shop for millions of items with fast local delivery on our regional sites. <Link to="/products" className="text-[#007185] hover:text-[#c45500] hover:underline">Click here to go to local site</Link></p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex min-h-[420px] flex-col overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] p-4">
                <div className="mb-4 h-6 w-1/2 animate-pulse rounded bg-gray-200" />
                <div className="h-64 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] bg-gray-100" />
                <div className="flex-1 pt-4 mt-auto">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}