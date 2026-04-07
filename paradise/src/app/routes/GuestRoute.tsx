import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../shared/store/useAuthStore';


export function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
