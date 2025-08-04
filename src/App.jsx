import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/img/vite.svg'
import './App.css'
import Headers from '../src/components/layout/Header'
import Home from '../src/components/Pages/Home'
import Cart from '../src/components/Pages/Cart'
import Shop from '../src/components/Pages/Shop'
import Contact from '../src/components/Pages/Contact'
import Footers from '../src/components/layout/Footer'
import { Route, Routes } from 'react-router'
import { useLocation } from 'react-router-dom';
import Login from './components/Pages/login'

function App() {
  const location = useLocation()
  const islogin = location.pathname === '/login';
  return (
    <>
      {!islogin && <Headers />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      {!islogin && <Footers />}
    </>
  )
}

export default App
