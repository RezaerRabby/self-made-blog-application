


"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleUser() {
  const { usersId } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  //  NEW STATE (for update form)
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!usersId) return;

    const loadUser = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        console.log(" All Users:", data);
        console.log(" ID:", usersId);

        const list = Array.isArray(data) ? data : [data];

        setAllUsers(list);
        localStorage.setItem("users", JSON.stringify(list));

        const foundUser = list.find(
          (u) => String(u.id) === String(usersId)
        );

        console.log(" Found User:", foundUser);

        setUser(foundUser || null);

      } catch (err) {
        console.log(" Error:", err);

        const local = localStorage.getItem("users");
        if (local) {
          const parsed = JSON.parse(local);

          setAllUsers(parsed);

          const foundUser = parsed.find(
            (u) => String(u.id) === String(usersId)
          );

          setUser(foundUser || null);
        }
      }
    };

    loadUser();
  }, [usersId]);

  //  DELETE
  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) return;

    const updated = allUsers.filter(
      (u) => u.id !== user.id
    );

    console.log(" Deleted User:", user);
    console.log(" After Delete:", updated);

    setAllUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));

    alert("User deleted successfully!");

    router.push("/users");
  };

  //  Loading
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        ⏳ Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">User Details</h1>

        <button
          onClick={() => router.push("/users")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          ⬅ Back
        </button>
      </div>

      {/* CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center gap-6">

          <Image
            src="/default.png"
            alt={user.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-500"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>

            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                {user.role}
              </span>

              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  user.status === "active"
                    ? "bg-green-100 text-green-600"
                    : user.status === "blocked"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm">

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">{user.email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Phone</p>
            <p className="font-semibold">{user.phone}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
            <p className="text-gray-500">Address</p>
            <p className="font-semibold">{user.address}</p>
          </div>
        </div>

        {/*  ACTION BUTTONS */}
        <div className="flex justify-between mt-8">

          {/*  UPDATE */}
          <button
            onClick={() => {
              console.log(" Update Clicked:", user);
              setForm(user);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update
          </button>

          {/* 🗑 DELETE */}
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>

        </div>

        {/*  UPDATE FORM */}
        {showForm && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">

            <h2 className="text-lg font-bold mb-4">
              Update User
            </h2>

            <div className="grid gap-3">

              <input
                value={form.name || ""}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Name"
              />

              <input
                value={form.username || ""}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Username"
              />

              <input
                value={form.email || ""}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Email"
              />

              <input
                value={form.phone || ""}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Phone"
              />

              <input
                value={form.address || ""}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="border p-2 rounded"
                placeholder="Address"
              />

              <select
                value={form.status || ""}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>

              {/* SAVE */}
              <button
                onClick={() => {
                  const updated = allUsers.map((u) =>
                    u.id === user.id ? form : u
                  );

                  console.log(" Updated User:", form);
                  console.log("All Users After Update:", updated);

                  setAllUsers(updated);
                  setUser(form);

                  localStorage.setItem("users", JSON.stringify(updated));

                  alert("User Updated Successfully!");

                  setShowForm(false);
                }}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Save Update
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}


