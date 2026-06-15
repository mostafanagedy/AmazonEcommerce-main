import React from "react";
import { Link } from "react-router-dom";

export default function GenericPage({ title, description }) {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-bg-light py-12 px-6">
      <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
        <h1 className="text-3xl font-bold text-text-main mb-4">{title}</h1>
        <p className="text-lg text-text-muted mb-8">{description}</p>
        
        <div className="flex justify-center">
          <Link 
            to="/products"
            className="rounded-full bg-[#ffd814] px-8 py-3 font-medium text-[#0f1111] shadow-sm hover:bg-[#f7ca00] transition-colors border border-[#a88734]"
          >
            Go to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
