import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import Dashboard from "../pages/admin/dashboard";
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
      <Route path="admin" element={<AdminLayout />}>
        <Route
          path="dashboard"
          element={<Dashboard />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
    </>
  )
);

export default router;
