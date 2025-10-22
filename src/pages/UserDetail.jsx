import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("qrRecords") || "[]");
    const found = users.find((u) => u.id === id);
    setUser(found || null);
  }, [id]);

  if (!user) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">User Detail</h1>
        {Object.entries(user).map(([k, v]) => (
          <p key={k}>
            <strong>{k}:</strong> {v}
          </p>
        ))}
      </div>
    </div>
  );
}
