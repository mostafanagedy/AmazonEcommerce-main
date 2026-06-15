import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password && password === reEnterPassword) {
      register(name, email, password);
      navigate("/");
    } else if (password !== reEnterPassword) {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8">
      {/* Amazon Logo */}
      <Link to="/" className="mb-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-[100px] mt-2 object-contain" />
      </Link>

      {/* Register Box */}
      <div className="w-full max-w-[350px] p-6 border border-gray-300 rounded-[8px] mb-6">
        <h1 className="text-[28px] font-normal mb-4">Create account</h1>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Your name</label>
            <input 
              type="text" 
              placeholder="First and last name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-2 py-1 placeholder:text-[13px] border border-gray-400 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Mobile number or email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-1 border border-gray-400 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Password</label>
            <input 
              type="password" 
              placeholder="At least 6 characters"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-2 py-1 placeholder:text-[13px] border border-gray-400 rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,.5)] transition-all"
            />
            <div className="flex items-center gap-2 mt-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0066c0" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
              <span className="text-[12px]">Passwords must be at least 6 characters.</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold">Re-enter password</label>
            <input 
              type="password" 
              required
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
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

        <p className="text-[12px] mt-6 leading-relaxed">
          By creating an account, you agree to Amazon's <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        <div className="h-[1px] bg-gray-200 w-full mt-6 mb-4"></div>

        <div className="text-[13px]">
          Already have an account? <Link to="/login" className="text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer">Sign in <span className="text-[10px]">▶</span></Link>
        </div>
      </div>
    </div>
  );
}
