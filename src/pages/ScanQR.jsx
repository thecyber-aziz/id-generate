import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { motion, AnimatePresence } from "framer-motion";
import "../style/gradients.css";
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';

export default function ScanQR() {
  const [scannedUsers, setScannedUsers] = useState([]);
  const [scannerError, setScannerError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [popup, setPopup] = useState({ message: "", type: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("scannedUsers") || "[]");
    setScannedUsers(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("scannedUsers", JSON.stringify(scannedUsers));
  }, [scannedUsers]);

  const startScanner = () => {
    setScannerError("");
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        try {
          const data = JSON.parse(decodedText);
          const newUser = {
            name: data.name || "-",
            email: data.email || "-",
            phone: data.phone || "-",
            id: data.id || "-",
            notes: data.notes || "-",
            scannedAt: new Date().toISOString(),
          };
          setScannedUsers((prev) => [...prev, newUser]);

          setPopup({
            message: `✅ ${newUser.name || "User"} scanned successfully!`,
            type: "success",
          });
        } catch {
          setPopup({
            message: "❌ Invalid QR Code",
            type: "error",
          });
        }
        setTimeout(() => setPopup({ message: "", type: "" }), 3000);
        scanner.clear();
      },
      () => {}
    );
  };

  const confirmDelete = (user, index) => {
    setUserToDelete({ ...user, index });
    setShowModal(true);
  };

  const deleteUser = () => {
    if (!userToDelete) return;
    const updated = scannedUsers.filter((_, i) => i !== userToDelete.index);
    setScannedUsers(updated);
    setShowModal(false);
    setUserToDelete(null);
  };

  const clearAll = () => {
    if (!window.confirm("Delete all scanned users?")) return;
    setScannedUsers([]);
  };

  return (
    <>
    <Navbar/>
      {/* ✅ Popup Notification */}
      <AnimatePresence>
        {popup.message && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-4 left-1 transform -translate-x-1/2 
              sm:w-auto w-[95%] px-3 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50 text-center 
              ${
                popup.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-50 relative top-8 p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Employee ID Scanner
        </h1>

        <div className="gradient-box p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-white">Scan QR Code</h2>
          <div id="reader" className="mb-4"></div>
          <button
            onClick={startScanner}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition w-full sm:w-auto"
          >
            Start Scanner
          </button>
          {scannerError && <p className="text-red-300 mt-3">{scannerError}</p>}
        </div>

        <div className="gradient-boxx p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Scanned IDs</h2>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition "
            >
              Clear All
            </button>
          </div>

          {scannedUsers.length === 0 ? (
            <p className="text-gray-200 text-center">No users scanned yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {scannedUsers.map((user, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-lg shadow hover:shadow-md transition gradient-${
                    (i % 5) + 1
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-sm">{user.phone}</p>
                  <p className="text-sm">ID: {user.id}</p>
                  {user.notes && (
                    <p className="text-xs opacity-90 mt-1">Notes: {user.notes}</p>
                  )}
                  <p className="text-xs opacity-80 mt-1">
                    Scanned: {new Date(user.scannedAt).toLocaleString()}
                  </p>
                  {/* <button
                    onClick={() => confirmDelete(user, i)}
                    className="mt-3 px-3 py-1 w-full text-red-600 bg-red-100 rounded-lg hover:bg-red-200 text-sm transition"
                  >
                    Delete
                  </button> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
