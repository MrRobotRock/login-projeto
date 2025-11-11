import { Navigate } from 'react-router-dom';
import api from '../services/api';

function ProtectedRoute({ children }) {
  const isAuthenticated = api.auth.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;