import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import { Mail, Lock, User,  UserPlus, PlusCircle, MapPin, Phone} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../util/api";
import toast from "react-hot-toast";

export default function Signup(){
const [name, setName] = useState("");

const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [phone, setPhone] = useState("");

const [password, setPassword] = useState("");



const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/signup", {
      name,
      email,
      password,
      address,
      phone
    });
    console.log(res.data);

    setName("");
    setEmail("");

    setPassword("");
    navigate("/")
     toast.success("Login successfull!")
  } catch (error) {
    console.log(error)
    toast.error(`Login Error: ${error.message}`)
  }
};

return (
  <div className="from-yellow-100 to-pink-200 bg-linear-to-r min-h-screen w-full flex items-center justify-center overflow-hidden">
   
    <motion.div
      className=" z-10 bg-white/80 max-w-4xl p-8 mx-auto rounded-4xl shadow-md w-full"
      initial={{ opacity: 0, y: -70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
    >
      <h2 className="text-2xl flex justify-center items-center text-cyan-700 font-bold text-center mb-6">
        Signup Form <PlusCircle className="text-cyan-700 ml-2 mt-1.5 h-5 w-5" />
      </h2>

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Responsive inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center border rounded px-3 py-2">
            <User className="text-cyan-700 mr-2 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              required
              className="text-cyan-700 rounded-lg focus:outline-none p-2 w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="text-cyan-700 mr-2 h-5 w-5" />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              required
              className="text-cyan-700 rounded-lg focus:outline-none p-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <MapPin className="text-cyan-700 mr-2 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              required
              className="text-cyan-700 rounded-lg focus:outline-none p-2 w-full"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex items-center border rounded px-3 py-2">
            <Phone className="text-cyan-700 mr-2 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter phone"
              value={phone}
              required
              className="text-cyan-700 rounded-lg focus:outline-none p-2 w-full"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="text-cyan-700 mr-2 h-5 w-5" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              required
              className="text-cyan-700 rounded-lg focus:outline-none p-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Signup button */}
        <button
          type="submit"
          className="flex items-center justify-center text-xl w-full text-pink-100 transition duration-300 opacity-90 bg-linear-to-r from-orange-400 to-yellow-500 py-5 rounded-lg hover:opacity-100"
        >
          <UserPlus className="text-pink-200 mr-2 h-5 w-5" /> Signup
        </button>
      </form>

      <p className="text-center mt-6 text-cyan-700 text-lg">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-yellow-600 transition duration-700 hover:underline"
        >
          Click Here
        </Link>
      </p>
    </motion.div>
  </div>
);}