import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Brand from "src/pages/admin/brand";
import Category from "src/pages/admin/category";
import Profile from "src/pages/admin/profile";
import AdminLayout from "../components/AdminLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import Dashboard from "../pages/admin/dashboard";
import Settings from "../pages/admin/settings";
import AuthCallback from "../pages/auth/callback";
import EmailVerify from "../pages/auth/emailVerify";
import Login from "../pages/login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} errorElement={<ErrorBoundary />} />
      <Route
        path="auth/login/callback"
        element={<AuthCallback />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="email/verification"
        element={<EmailVerify />}
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="admin"
        element={<AdminLayout />}
        errorElement={<ErrorBoundary />}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="brand" element={<Brand />} />
        <Route path="category" element={<Category />} />
      </Route>
    </>
  )
);

export default router;
