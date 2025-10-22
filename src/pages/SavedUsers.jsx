import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import "../style/gradients.css"; // make sure this file exists
import Navbar from '../components/Navbar';

export default function SavedUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Load saved users
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("qrRecords") || "[]");
    setUsers(saved);
    setFilteredUsers(saved);
  }, []);

  // Filter users on search
  useEffect(() => {
    if (!search) {
      setFilteredUsers(users);
      return;
    }
    const query = search.toLowerCase();
    const filtered = users.filter(
      (user) =>
        (user.name && user.name.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query)) ||
        (user.phone && user.phone.toLowerCase().includes(query)) ||
        (user.id && user.id.toLowerCase().includes(query))
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // Handle delete confirmation
  const confirmDelete = (user, index) => {
    setUserToDelete({ ...user, index });
    setShowModal(true);
  };

  const deleteUser = () => {
    if (userToDelete === null) return;
    const updated = users.filter((_, i) => i !== userToDelete.index);
    setUsers(updated);
    setFilteredUsers(updated);
    localStorage.setItem("qrRecords", JSON.stringify(updated));
    setShowModal(false);
    setUserToDelete(null);
  };

  // Clear all users
  const clearAll = () => {
    if (!window.confirm("Are you sure you want to delete all users?")) return;
    setUsers([]);
    setFilteredUsers([]);
    localStorage.setItem("qrRecords", JSON.stringify([]));
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-slate-50 relative top-8 p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Saved Employe Id
        </h1>

        {/* Search + Clear All */}
        <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-3 items-center gradient-search">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, id, phone"
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-blue-900 border-gray-300 shadow-sm outline-none focus:ring-1 focus:ring-white focus:border-white transition"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              ></path>
            </svg>
          </div>

          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 shadow transition"
          >
            Clear All
          </button>
        </div>

        {/* Users Grid */}
        <div className="mt-8 gradient-saved p-4 rounded-lg shadow-lg">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No saved Id found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, i) => (
              <div
                key={i}
                className={`p-5 rounded-lg shadow hover:shadow-md transition ${
                  i % 3 === 0
                    ? "user-card-1"
                    : i % 3 === 1
                    ? "user-card-2"
                    : "user-card-3"
                }`}
              >
                <h3 className="font-semibold text-lg mb-1">{user.name || "-"}</h3>
                <p className="text-sm">{user.email || "-"}</p>
                <p className="text-sm">{user.phone || "-"}</p>
                <p className="text-sm">ID: {user.id || "-"}</p>
                {user.notes && (
                  <p className="text-xs mt-1">Notes: {user.notes}</p>
                )}
                <p className="text-xs mt-1">
                  Generated: {new Date(user.generatedAt).toLocaleString()}
                </p>
                <button
                  onClick={() => confirmDelete(user, i)}
                  className="mt-3 px-3 py-1 w-full rounded-lg btn-gradient-delete text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showModal && userToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="gradient-modal w-96 max-w-full"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Delete User?
                </h2>
                <p className="mb-4">
                  Are you sure you want to delete{" "}
                  <span className="font-medium">
                    {userToDelete.name || "this user"}
                  </span>
                  ?<br />
                  <span className="text-sm">
                    (Email: {userToDelete.email || "N/A"})
                  </span>
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-gradient-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteUser}
                    className="btn-gradient-delete"
                  >
                    Delete
                  </button>
                </div>
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
