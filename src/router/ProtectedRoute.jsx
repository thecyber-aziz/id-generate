// File: src/router/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}
