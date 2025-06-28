import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import SettingPage from "../pages/SettingPage";
import ProfilePage from "../pages/ProfilePage";

function ProtectedRoute({ children }) {
  const authUser = useAuthStore((state) => state.authUser);
  return authUser ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const authUser = useAuthStore((state) => state.authUser);
  return !authUser ? children : <Navigate to="/" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><HomePage /></ProtectedRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute><LoginPage /></PublicRoute>,
  },
  {
    path: "/signup",
    element: <PublicRoute><SignUpPage /></PublicRoute>,
  },
  {
    path: "/settings",
    element: <SettingPage />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
]);

export default router;