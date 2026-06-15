import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery !== null) {
      setSearch(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || p.category === category;
      return matchSearch && matchCat;
    });
    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
    return result;
  }, [products, search, category, sort]);

  return (
    <div className="min-h-screen bg-bg-light py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-border-light pb-6">
          <h1 className="text-3xl font-extrabold text-text-main md:text-4xl">All Products</h1>
          <p className="mt-2 text-text-muted">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
        </div>

        {/* FILTERS */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
            {/* SEARCH */}
            <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>
            {/* SORT */}
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)} 
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          
          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200 ${
                  category === cat 
                    ? "border-primary bg-primary text-white shadow-md" 
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-border-light">
                <div className="h-56 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] bg-gray-100" />
                <div className="flex-1 p-4">
                  <div className="mb-2 h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="mt-8 h-10 w-full animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 px-6 text-center shadow-sm border border-gray-100">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-6 text-gray-300">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <h3 className="mb-2 text-2xl font-bold text-gray-800">No products found</h3>
            <p className="mb-6 text-gray-500">Try different search terms or clear the filters.</p>
            <button 
              className="rounded-full bg-primary px-6 py-2.5 font-bold text-white transition-colors hover:bg-primary-hover"
              onClick={() => { setSearch(""); setCategory("all"); setSort("default"); }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}