import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact'
import Faculty from './pages/Faculty'
import Footer from "./components/Footer"
import Chat from './pages/Chat';
import Login from './pages/Login';

import AdminDashboard from './Admin/pages/AdminDashboard';
import AdminLogin from './Admin/pages/AdminLogin';
import AdminNavbar from './Admin/components/AdminNavbar';
import AdminStudents from './Admin/pages/AdminStudents';
import AdminFaculties from './Admin/pages/AdminFaculties';
import AdminResources from './Admin/pages/AdminResources';

import ProtectedRoute from './components/ProtectedRoute';
import AdminAddResources from './Admin/pages/AdminAddResource';

function App() {

  const location = useLocation();

  const hideNavbarRoutes = [
    "/admin/login",
    "/login"
  ];

  return (
    <>
      {
        !hideNavbarRoutes.includes(
          location.pathname
        ) ? (!location.pathname.startsWith('/admin') ? <Navbar /> : <AdminNavbar />) : <></>
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/resources" element={<ProtectedRoute toUrl="/login"><Resources /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute toUrl="/login"><Chat /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute toUrl="/admin/login"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard/students" element={<ProtectedRoute toUrl="/admin/login"><AdminStudents /></ProtectedRoute>} />
        <Route path="/admin/dashboard/faculties" element={<ProtectedRoute toUrl="/admin/login"><AdminFaculties /></ProtectedRoute>} />
        <Route path="/admin/dashboard/resources" element={<ProtectedRoute toUrl="/admin/login"><AdminResources /></ProtectedRoute>} />
        <Route path="/admin/dashboard/resources/add" element={<ProtectedRoute toUrl="/admin/login"><AdminAddResources /></ProtectedRoute>} />


      </Routes>

      <Footer />
    </>
  )
}

export default App;
