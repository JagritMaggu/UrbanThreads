

import { useState,useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import './App.css'
import { Home } from 'lucide-react';
import Homepage from '../components/Homepage';
import Signup from '../components/Signup';
import LoginForm from '../components/Login';
import Cart from '../components/Cart';
import MyOrders from '../components/MyOrders';
import MyWishlist from '../components/MyWishlist';
function App() {


  return (
    <>
     <Toaster position="top-right" />
      <Routes>
    <Route path='/signup' element={<Signup/>}/> 
    <Route path='/login' element={<LoginForm/>}/> 
    <Route path='/cart' element={<Cart/>}/> 
    <Route path='/myOrders' element={<MyOrders/>}/> 
    <Route path='/myWishlist' element={<MyWishlist/>}/> 
    <Route path='/' element={<Homepage/>}/> 
    </Routes>
    </>
  )
}

export default App
