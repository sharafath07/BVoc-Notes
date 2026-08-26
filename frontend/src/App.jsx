import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About';
import Resources from './pages/Resources';
import Chat from './pages/Chat';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './pages/Contact'
import Faculty from './pages/Faculty'
import Footer from "./components/Footer"

function App() {

  const location = useLocation();

  const hideNavbarRoutes = [
    "/admin/login",
    "/login"
  ];

  const adminRoutes = [
    'admin/dashboard'
  ]

  return (
    <>
      {
        !hideNavbarRoutes.includes(
          location.pathname
        ) ? !adminRoutes.includes(location.pathname) ? <Navbar /> : <NavbarAdmin /> : <></>
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App;
