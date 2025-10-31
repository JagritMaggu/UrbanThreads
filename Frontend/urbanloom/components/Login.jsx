import React from 'react'

import { Mail, Lock, ArrowRightCircle, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../util/api.js";
import toast from "react-hot-toast";

export default function LoginForm() {
 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/login", {
        email,
        password,
      });

      setEmail("");
      setPassword("");
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(`Login Error: ${error.message}`);
    }
  };

  return (
    <div className="from-yellow-100 to-pink-200 bg-linear-to-r min-h-screen w-full flex items-center justify-center overflow-hidden">


      <motion.div
        className="bg-white/80 z-10 p-6 sm:p-8 rounded-3xl sm:rounded-4xl shadow-md w-full sm:max-w-xl md:max-w-2xl lg:max-w-5xl "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl flex justify-center items-center text-cyan-700 font-bold text-center mb-6">
          Login Form{" "}
          <LogIn className="text-cyan-700 ml-2 sm:h-5 sm:w-5  mt-1.5 lg:h-5 lg:w-5 " />
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
      <div className='flex flex-col items-center w-full md:grid md:grid-cols-2 md:justify-center md:w-full space-x-3'>
         <div className="flex sm:flex-row items-center border rounded-lg px-3 py-2 space-y-2 sm:space-y-0 sm:space-x-3">
  <Mail className="text-cyan-700 h-3 w-3 mt-1  sm:h-5 sm:w-5" />
  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="text-cyan-700 rounded-md focus:outline-none p-2 w-full sm:w-auto flex-1"
    required
  />
</div>


          <div className="flex  sm:flex-row items-center border rounded-lg px-3 py-2 space-y-2 sm:space-y-0 sm:space-x-3">
            <Lock className="text-cyan-700 h-3 w-3 sm:h-5 mt-1 sm:w-5" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
         className="text-cyan-700 rounded-md focus:outline-none p-2 w-full sm:w-auto flex-1"
              required
            />
          </div>
</div>
   
          <button
            className="flex items-center justify-center text-xl w-full text-pink-100 transition duration-300 opacity-90 bg-linear-to-r from-purple-400 to-pink-500 py-5 rounded-lg hover:opacity-100"
            type="submit"
          >
            <ArrowRightCircle className="text-pink-200 mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Login
          </button>
        </form>

  
        <div className="mt-6 flex items-center justify-center">
          <p className="text-center text-cyan-700 text-base sm:text-lg">
            Don't have an account?{" "}
            <Link
              className="text-yellow-600 transition duration-700 hover:underline"
              to="/signup"
            >
              Click Here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}