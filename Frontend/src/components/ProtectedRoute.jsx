import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("in protected", isAuthenticated);
  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state if needed
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
