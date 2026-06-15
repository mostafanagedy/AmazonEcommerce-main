import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8">
      {/* Amazon Logo */}
      <Link to="/" className="mb-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-[100px] mt-2 object-contain" />
      </Link>

      {/* Login Box */}
      <div className="w-full max-w-[350px] p-6 border border-gray-300 rounded-[8px] mb-6">
        <h1 className="text-[28px] font-normal mb-4">Sign in</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Email or mobile phone number</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-end">
              <label className="text-[13px] font-bold">Password</label>
              <span className="text-[13px] text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Forgot your password?</span>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#f0c14b] border border-t-[#a88734] border-l-[#9c7e31] border-r-[#9c7e31] border-b-[#846a29] hover:bg-[#f4d078] active:bg-[#f0c14b] py-1 rounded-[3px] mt-2 shadow-[0_1px_0_rgba(255,255,255,.4)_inset]"
          >
            Continue
          </button>
        </form>

        <p className="text-[12px] mt-4 leading-relaxed">
          By continuing, you agree to Amazon's <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        <div className="mt-6 flex items-center group cursor-pointer">
          <span className="text-[13px] text-[#0066c0] group-hover:text-[#c45500] group-hover:underline">Need help?</span>
        </div>
      </div>

      <div className="w-full max-w-[350px] flex items-center gap-2 mb-4">
        <div className="h-[1px] bg-gray-300 flex-1"></div>
        <span className="text-[12px] text-gray-500">New to Amazon?</span>
        <div className="h-[1px] bg-gray-300 flex-1"></div>
      </div>

      <Link 
        to="/register" 
        className="w-full max-w-[350px] bg-[#e7e9ec] border border-[#adb1b8] text-center hover:bg-[#d9dce1] active:bg-[#e7e9ec] py-1 rounded-[3px] shadow-[0_1px_0_rgba(255,255,255,.6)_inset] text-[13px]"
      >
        Create your Amazon account
      </Link>
    </div>
  );
}
