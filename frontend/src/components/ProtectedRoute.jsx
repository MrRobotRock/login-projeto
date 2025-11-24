import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../services/api";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const isAuthenticated = api.auth.isAuthenticated();
  const user = api.auth.getCurrentUser();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission) {
    const roles = user.roles || [];
    const isAdmin = roles.some(r => {
        const roleName = (typeof r === 'string' ? r : r.nome) || "";
        return roleName.toUpperCase() === "ADMIN" || roleName === "Administrador";
    });
    
    const userPermissions = user.permissions || [];
    const hasPermission = userPermissions.includes(requiredPermission);

    if (!isAdmin && !hasPermission) {
      console.warn(`Acesso negado. Usuário: ${user.email}`);
      return <Navigate to="/menu" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;