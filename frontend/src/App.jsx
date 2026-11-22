import React, { lazy, Suspense, useContext, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'motion/react'

import Loading from './components/Loading'
import { Context } from './Context/Context'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from "./components/Footer"

import ProtectedRoute from './components/ProtectedRoute';

const About = lazy(() => import('./pages/About'));
const Resources = lazy(() => import('./pages/Resources'));
const Contact = lazy(() => import('./pages/Contact'));
const Faculty = lazy(() => import('./pages/Faculty'));
const Chat = lazy(() => import('./pages/Chat'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./Admin/pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./Admin/pages/AdminLogin'));
const AdminStudents = lazy(() => import('./Admin/pages/AdminStudents'));
const AdminFaculties = lazy(() => import('./Admin/pages/AdminFaculties'));
const AdminResources = lazy(() => import('./Admin/pages/AdminResources'));
const AdminAddFaculties = lazy(() => import('./Admin/pages/AdminAddFaculties'));
const AdminAddResources = lazy(() => import('./Admin/pages/AdminAddResource'));
const AdminEditResource = lazy(() => import('./Admin/pages/AdminEditResource'));
const AdminSubjects = lazy(() => import('./Admin/pages/AdminSubjects'));
const AdminAddSubject = lazy(() => import('./Admin/pages/AdminAddSubject'));

function App() {
  const { isDark, isLoading } = useContext(Context);
  const { pathname } = useLocation();
  const login = pathname === "/login" || pathname === "/admin/login";
  const staff = pathname.startsWith("/admin/dashboard");
  const workspace = staff || pathname === "/resources" || pathname === "/chat";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
    <div className={`department-site ${isDark ? "department-dark" : ""}`}>
      <a href="#route-content" className="department-skip">Skip to content</a>
      <Navbar staff={staff} />
      {isLoading && <Loading />}
      <div id="route-content" tabIndex={-1} className={`department-route ${workspace ? "department-workspace" : ""} ${login ? "department-auth" : ""}`}>
      <Suspense fallback={<p className="department-container department-route-loading" role="status">Loading page…</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/resources" element={<Resources />} />
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
      </Suspense>
      </div>
      {!login && <Footer />}
    </div>
    </MotionConfig>
  )
}

export default App;
