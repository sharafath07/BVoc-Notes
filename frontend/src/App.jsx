import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Loading from './components/Loading'
import { Context } from './Context/Context'

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
import AdminAddFaculties from "./Admin/pages/AdminAddFaculties";

import ProtectedRoute from './components/ProtectedRoute';
import AdminAddResources from './Admin/pages/AdminAddResource';
import AdminEditResource from './Admin/pages/AdminEditResource';
import AdminSubjects from './Admin/pages/AdminSubjects';
import AdminAddSubject from './Admin/pages/AdminAddSubject';

function App() {
  const { isLoading } = useContext(Context);
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
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/resources" element={<ProtectedRoute allowedRoles={["STUDENT", "ADMIN", "TEACHER"]}><Resources /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute allowedRoles={["STUDENT", "ADMIN", "TEACHER"]}><Chat /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl="/admin/login"  ><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard/students" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl="/admin/login"  ><AdminStudents /></ProtectedRoute>} />
        <Route path="/admin/dashboard/faculties" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl="/admin/login"  ><AdminFaculties /></ProtectedRoute>} />
        <Route path="/admin/dashboard/resources" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl="/admin/login"  ><AdminResources /></ProtectedRoute>} />
        <Route path="/admin/dashboard/resources/add" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl="/admin/login"  ><AdminAddResources /></ProtectedRoute>} />
        <Route path="/admin/dashboard/resources/edit/:id" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl='/admin/login'  ><AdminEditResource /></ProtectedRoute>} />
        <Route path="/admin/dashboard/subjects" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl="/admin/login"  ><AdminSubjects /></ProtectedRoute>} />
        <Route path="/admin/dashboard/subjects/add" element={<ProtectedRoute allowedRoles={["ADMIN", "TEACHER"]} toUrl="/admin/login"  ><AdminAddSubject /></ProtectedRoute>} />
        <Route path="/admin/dashboard/faculties/register" element={<ProtectedRoute allowedRoles={["ADMIN"]} toUrl="/admin/login"  ><AdminAddFaculties /></ProtectedRoute>} />

      </Routes>
      {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App;
