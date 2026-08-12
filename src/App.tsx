import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

// Public Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import FindBlood from './pages/FindBlood'
import DonorDetails from './pages/DonorDetails'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Impact from './pages/Impact'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Onboarding from './pages/Onboarding'

// Dashboard & Protected Pages
import Dashboard from './pages/Dashboard'
import Overview from './pages/dashboard/Overview'
import MyRequests from './pages/dashboard/MyRequests'
import DashboardProfile from './pages/dashboard/DashboardProfile'
import Settings from './pages/dashboard/Settings'

// Admin Pages
import ManageUsers from './pages/dashboard/ManageUsers'
import ManageDonors from './pages/dashboard/ManageDonors'
import Analytics from './pages/dashboard/Analytics'
import BlogManager from './pages/dashboard/BlogManager'
import ContactMessages from './pages/dashboard/ContactMessages'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="find-blood" element={<FindBlood />} />
            <Route path="donor/:id" element={<DonorDetails />} />
            
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            
            <Route path="impact" element={<Impact />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            
            {/* Protected Onboarding */}
            <Route path="onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

            {/* Dashboard Routes (User & Admin) */}
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
              {/* Shared Routes */}
              <Route index element={<Overview />} />
              <Route path="profile" element={<DashboardProfile />} />
              <Route path="settings" element={<Settings />} />
              
              {/* User Only Routes */}
              <Route path="my-requests" element={<MyRequests />} />
              
              {/* Admin Only Routes */}
              <Route path="manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
              <Route path="manage-donors" element={<AdminRoute><ManageDonors /></AdminRoute>} />
              <Route path="analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
              <Route path="blog-manager" element={<AdminRoute><BlogManager /></AdminRoute>} />
              <Route path="messages" element={<AdminRoute><ContactMessages /></AdminRoute>} />
            </Route>

            {/* Legacy redirect for old profile route */}
            <Route path="profile" element={<Navigate to="/dashboard/profile" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
