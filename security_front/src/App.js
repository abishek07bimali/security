import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import HomePage from "./pages/client/HomePage";
import CompanyDetails from "./pages/client/CompanyDetails";
import Backup from "./pages/client/Backup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogDetails from "./pages/client/BlogDetails";
import Blogs from "./pages/client/Blogs";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/client/Profile";
import CompanyAddingForm from "./pages/client/CompanyAddingForm";
import AddBlogs from "./pages/admin/AddBlogs";
import AdminViewBlogs from "./pages/admin/AdminViewBlogs";
import Dashboard from "./pages/admin/Dashboard";
import EditBlogs from "./pages/admin/EditBlogs";
import AdminCompanyAddingForm from "./pages/admin/AdminCompanyAddingForm";
import Support from "./pages/admin/Support";
import AdminRoutes from "./protected/AdminRoutes";
import ProtectedRoutes from "./protected/ProtectedRoute";
import ContactPage from "./pages/client/ContactPage";
import AdminViewCompany from "./pages/admin/AdminViewCompany";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminCompanyEditingForm from "./pages/admin/AdminCompanyEditingForm";
import AdminViewContact from "./pages/admin/AdminViewContact";
import Help from "./pages/client/Help";
import AdminAllClaims from "./pages/admin/AdminAllClaims";
import CompanyEditingForm from "./pages/client/CompanyEditingForm";
import AdminViewUserLogs from "./pages/admin/AdminViewUserLogs.jsx";

function App() {
  const location = useLocation();
  const adminRoutes = [
    "/admin-dashboard",
    "/admin-add-blogs",
    "/admin-all-claims",
    "/admin-view-blogs",
    "/dashboard",
    "/admin-company-add",
    "/login",
    "/register",
    "/admin-view-companies",
    "/admin-profile",
    "/admin-view-contact",
    "/admin-view-user-logs"
  ];

  const isAdminRoute =
    adminRoutes.includes(location.pathname) ||
    /^\/admin-edit-blogs\/[^/]+$/.test(location.pathname) ||
    /^\/admin-edit-company\/[^/]+$/.test(location.pathname);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Toaster position='top-right' />
            <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/company-details/:id" element={<CompanyDetails />} />
        <Route path="/company-details" element={<Backup />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/help_and_faq" element={<Help />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/add-company-form" element={<CompanyAddingForm />} />
          <Route
            path="/user-edit-company/:id"
            element={<CompanyEditingForm />}
          />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin-company-add"
            element={<AdminCompanyAddingForm />}
          />
          <Route path="/admin-add-blogs" element={<AddBlogs />} />
          <Route path="/admin-all-claims" element={<AdminAllClaims />} />
          <Route path="/admin-view-blogs" element={<AdminViewBlogs />} />
          <Route path="/admin-view-companies" element={<AdminViewCompany />} />
          <Route path="/admin-view-contact" element={<AdminViewContact />} />
          <Route path="/admin-edit-blogs/:id" element={<EditBlogs />} />
          <Route
            path="/admin-edit-company/:id"
            element={<AdminCompanyEditingForm />}
          />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-view-user-logs" element={<AdminViewUserLogs />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
