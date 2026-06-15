import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Deals from "./pages/Deals";
import CustomerService from "./pages/CustomerService";
import Registry from "./pages/Registry";
import GiftCards from "./pages/GiftCards";
import Sell from "./pages/Sell";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Pages without Navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Pages with Navbar */}
            <Route path="/*" element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/"            element={<Home />} />
                    <Route path="/products"    element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart"        element={<Cart />} />
                    <Route path="/checkout"    element={<Checkout />} />
                    <Route path="/deals"       element={<Deals />} />
                    <Route path="/customer-service" element={<CustomerService />} />
                    <Route path="/registry"    element={<Registry />} />
                    <Route path="/giftcards"   element={<GiftCards />} />
                    <Route path="/sell"        element={<Sell />} />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}