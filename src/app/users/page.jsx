


"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        // safe list fix for both array and object response
        const fixedData = Array.isArray(data) ? data : [data];
        setUsers(fixedData);

        console.log("Users Data:", fixedData);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold  mb-6">
        Users List
      </h1>
      </div>
      <Link href="/users/create">
      
      <div className="flex justify-center sm:justify-end mb-4">
  <h2 className="bg-blue-600 text-white text-sm sm:text-base md:text-lg 
                 px-4 sm:px-5 py-2 rounded-lg shadow 
                 hover:bg-blue-700 transition cursor-pointer 
                 w-full sm:w-auto text-center">
    + Create Post
  </h2>
</div>
</Link>
      
      </div>

      {/* USERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col h-full"
          >

            {/* Top */}
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/default.png"
                alt={user.name}
                width={50}
                height={50}
                className="rounded-full object-cover border"
              />

              <div>
                <h2 className="text-base font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* Info */}
            <p className="text-sm text-gray-600 break-all flex-1">
              {user.email}
            </p>

            <p className="text-sm text-gray-500">{user.phone}</p>
            <p className="text-sm text-gray-400">{user.address}</p>

            {/* Bottom */}
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-[2px] rounded">
                {user.role}
              </span>

              <span
                className={`text-xs px-2 py-[2px] rounded ${
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
        ))}

      </div>
      
    </div>
    
  );
}


