"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    status: "active",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = localStorage.getItem("users");
    const users = existing ? JSON.parse(existing) : [];

    const newUser = {
      id: Date.now(),
      ...form,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    console.log("✅ New User Added:", newUser);
    console.log("📦 All Users:", updatedUsers);

    // redirect to users list
    router.push("/users");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-center">
          Create User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <select
            name="status"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add User
          </button>

        </form>

      </div>
    </div>
  );
}