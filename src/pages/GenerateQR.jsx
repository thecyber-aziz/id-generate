import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import QRCode from "qrcode";
import "../style/gradients.css"; // gradient styles
import Navbar from '../components/Navbar';

export default function GenerateQR() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    id: "",
    notes: "",
  });
  const [payload, setPayload] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const [size, setSize] = useState(320);
  const [ecc, setEcc] = useState("M"); // L,M,Q,H
  const [savedRecords, setSavedRecords] = useState(
    JSON.parse(localStorage.getItem("qrRecords") || "[]")
  );

  // generate QR whenever payload changes
  useEffect(() => {
    if (!payload) {
      setQrDataUrl("");
      return;
    }
    setError("");
    const opts = {
      errorCorrectionLevel: ecc,
      margin: 2,
      width: size,
      color: { dark: "#0f172a", light: "#ffffff" },
    };
    const canvas = canvasRef.current;
    if (!canvas) return;
    QRCode.toCanvas(canvas, payload, opts, function (err) {
      if (err) {
        console.error(err);
        setError("Failed to generate QR");
        setQrDataUrl("");
        return;
      }
      try {
        const dataUrl = canvas.toDataURL("image/png");
        setQrDataUrl(dataUrl);
      } catch (e) {
        setError("Could not export QR image");
      }
    });
  }, [payload, size, ecc]);

  // handle input
  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Save and generate QR
  function onSaveGenerate() {
    const record = {
      name: form.name || "-",
      email: form.email || "-",
      phone: form.phone || "-",
      id: form.id || "-",
      notes: form.notes || "-",
      generatedAt: new Date().toISOString(),
    };
    const updated = [...savedRecords, record];
    localStorage.setItem("qrRecords", JSON.stringify(updated));
    setSavedRecords(updated);

    // build payload JSON for QR
    setPayload(JSON.stringify(record));
  }

  function onDownload() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    const filename = `qr_${form.name || "payload"}_${Date.now()}.png`;
    a.download = filename;
    a.click();
  }

  async function onCopyPayload() {
    try {
      await navigator.clipboard.writeText(payload);
      alert("Payload copied to clipboard");
    } catch {
      alert("Copy failed — permission denied");
    }
  }

  function onReset() {
    setForm({ name: "", email: "", phone: "", id: "", notes: "" });
    setPayload("");
    setQrDataUrl("");
  }

  function onClearRecords() {
    localStorage.removeItem("qrRecords");
    setSavedRecords([]);
  }

  return (
    <>
    <Navbar/>
      <div className="flex-1 bg-slate-50 p-2 md:p-">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          EMPLOYEE ID
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="gradient-form space-y-4 p-4 rounded-lg shadow-lg">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Name"
              className="w-full p-2 bg-blue-900 border rounded-lg text-white"
            />
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              className="w-full p-2 border bg-blue-900 rounded-lg text-white"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Phone"
              className="w-full p-2 border bg-blue-900 rounded-lg text-white"
            />
            <input
              name="id"
              value={form.id}
              onChange={onChange}
              placeholder="ID"
              className="w-full p-2 border bg-blue-900 rounded-lg text-white"
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Notes"
              className="w-full p-2 border bg-blue-900 rounded-lg text-white"
              rows="3"
            />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={onSaveGenerate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save & Generate
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right: QR Preview */}
          <div className="gradient-preview flex flex-col items-center p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-white">Preview</h2>
            <canvas
              ref={canvasRef}
              className="mb-4 bg-whit p-6 rounded"
              style={{ width: size, height: size }}
            />
            <div className="flex gap-2 mb-2">
              <button
                onClick={onCopyPayload}
                className="px-3 py-1 bg-amber-50 border rounded hover:bg-amber-100 text-black"
              >
                Copy JSON
              </button>
              <button
                onClick={onDownload}
                className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700"
              >
                Download PNG
              </button>
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </div>

        {/* Saved Records */}
        <div className="mt-8 gradient-saved p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">
              Saved Employee Preview
            </h2>
            {/* <button
              onClick={onClearRecords}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear All
            </button> */}
          </div>
          {savedRecords.length === 0 ? (
            <p className="text-gray-100">No saved IDs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedRecords.map((user, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg shadow hover:shadow-md transition gradient-${
                    (i % 5) + 1
                  }`}
                >
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-sm">{user.phone}</p>
                  <p className="text-sm">ID: {user.id}</p>
                  {user.notes && (
                    <p className="text-xs opacity-90 mt-1">Notes: {user.notes}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    Generated: {new Date(user.generatedAt).toLocaleString()}
                  </p>
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
