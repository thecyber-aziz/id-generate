// App.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import ReactRouter from "./router/ReactRouter.jsx";

export default function App() {
  const location = useLocation();

  // Login / Signup pages full screen
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <div
      className={
        isAuthPage
          ? "w-full h-full" // auth pages -> no padding, full screen
          : "md:pt-0 md:ml-56 p-0 md:p-6" 
          // mobile -> no padding/margin
          // desktop -> sidebar space + padding
      }
    >
      <ReactRouter />
    </div>
  );
}
