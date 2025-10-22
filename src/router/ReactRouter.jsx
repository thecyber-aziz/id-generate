// File: src/router/ReactRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/GenerateQR";
import Scan from "../pages/ScanQR";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SavedUsers from "../pages/SavedUsers";
import UserDetail from "../pages/UserDetail";
import ProtectedRoute from "./ProtectedRoute";

export default function ReactRouter() {
  return (
    <div >
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savedusers"
          element={
            <ProtectedRoute>
              <SavedUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
