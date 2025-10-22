import React, { useState } from "react";
import API from "../api";
import { saveAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      saveAuth(res.data.token, res.data.user);
      nav("/"); // ✅ redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl w-[90%] sm:w-[420px] p-8 border border-white/30">
        
        {/* Logo + App Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white text-indigo-600 font-bold text-xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg">
            N
          </div>
          <h1 className="text-2xl font-bold text-white mt-2">NexaEmpId</h1>
          <p className="text-white/80 text-sm">Login to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-white/40 bg-white/20 text-white placeholder-white/70 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-white/40 bg-white/20 text-white placeholder-white/70 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="text-red-200 bg-red-500/30 rounded-lg px-3 py-2 mt-4 text-center text-sm">
            {error}
          </p>
        )}

        {/* Extra Links */}
        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-yellow-300 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
