// "use client";

// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function SingleUser() {
//   const { usersId } = useParams();
//   const router = useRouter();

//   const [user, setUser] = useState(null);

//   console.log("User ID from URL:", usersId);

//   useEffect(() => {
//     if (!usersId) return;

//     const loadUser = async () => {
//       try {
//         const res = await fetch("/api/users");
//         const data = await res.json();

//         console.log("All Users:", data);
//         console.log("ID:", usersId);

//         // ✅ FIX: string match
//         const foundUser = data.find(
//           (u) => String(u.id) === String(usersId)
//         );

//         console.log("Found User:", foundUser);

//         setUser(foundUser || null);

//       } catch (err) {
//         console.log("Error:", err);
//       }
//     };

//     loadUser();
//   }, [usersId]);

//   // ⏳ Loading
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         ⏳ Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold">User Details</h1>

//         <button
//           onClick={() => router.push("/users")}
//           className="bg-gray-700 text-white px-4 py-2 rounded-lg"
//         >
//           ⬅ Back
//         </button>
//       </div>

//       {/* Card */}
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">

//         {/* Top */}
//         <div className="flex flex-col md:flex-row items-center gap-6">

//           {/* <Image
//             src={user.profile_image ? `/${user.profile_image}` : "/default.png"}
//             alt={user.name}
//             width={120}
//             height={120}
//             className="rounded-full border-4 border-blue-500"
//           /> */}

//           <div className="text-center md:text-left">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {user.name}
//             </h2>
//             <p className="text-gray-500">@{user.username}</p>

//             <div className="flex gap-2 justify-center md:justify-start mt-3">
//               <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
//                 {user.role}
//               </span>

//               <span
//                 className={`px-3 py-1 text-sm rounded-full ${
//                   user.status === "active"
//                     ? "bg-green-100 text-green-600"
//                     : user.status === "blocked"
//                     ? "bg-red-100 text-red-600"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 {user.status}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t my-6"></div>

//         {/* Info */}
//         <div className="grid md:grid-cols-2 gap-4 text-sm">

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-500">Email</p>
//             <p className="font-semibold">{user.email}</p>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-500">Phone</p>
//             <p className="font-semibold">{user.phone}</p>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
//             <p className="text-gray-500">Address</p>
//             <p className="font-semibold">{user.address}</p>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }































"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleUser() {
  const { usersId } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (!usersId) return;

    const loadUser = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        console.log("All Users:", data);
        console.log("ID:", usersId);

        setAllUsers(data);
        localStorage.setItem("users", JSON.stringify(data));

        const foundUser = data.find(
          (u) => String(u.id) === String(usersId)
        );

        console.log("Found User:", foundUser);

        setUser(foundUser || null);

      } catch (err) {
        console.log("Error:", err);

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

  // ⏳ Loading
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        ⏳ Loading...
      </div>
    );
  }

  // 🗑 DELETE FUNCTION
  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure?");

    if (!confirmDelete) return;

    const updated = allUsers.filter(
      (u) => u.id !== user.id
    );

    console.log("Deleted User:", user);
    console.log("After Delete:", updated);

    setAllUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));

    alert("User deleted successfully!");

    router.push("/users");
  };

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

        {/* 🔥 ACTION BUTTONS */}
        <div className="flex justify-between mt-8">

          {/* ✏️ UPDATE */}
          <button
            onClick={() => {
              console.log("Update Clicked:", user);
              router.push(`/users/edit/${user.id}`);
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

      </div>
    </div>
  );
}







// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Users() {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);

//   // ========================
//   // 📦 LOAD DATA
//   // ========================
//   useEffect(() => {
//     const localData = localStorage.getItem("users");

//     if (localData) {
//       // setUsers(JSON.parse(localData));
//       console.log("📦 From LocalStorage:", JSON.parse(localData));
//     } else {
//       fetch("/api/users")
//         .then((res) => res.json())
//         .then((data) => {
//           setUsers(data);
//           localStorage.setItem("users", JSON.stringify(data));
//           console.log("🌐 From API:", data);
//         });
//     }
//   }, []);

//   // ========================
//   // 🗑 DELETE USER
//   // ========================
//   const handleDelete = (id) => {
//     console.log("❌ Before Delete:", users);

//     const filtered = users.filter((u) => u.id !== id);

//     setUsers(filtered);
//     localStorage.setItem("users", JSON.stringify(filtered));

//     console.log("🗑 Deleted ID:", id);
//     console.log("✅ After Delete:", filtered);
//   };

//   // ========================
//   // ✏️ UPDATE USER (demo inline update)
//   // ========================
//   const handleUpdate = (user) => {
//     console.log("✏️ Before Update:", user);

//     const updatedUsers = users.map((u) =>
//       u.id === user.id
//         ? {
//             ...u,
//             name: u.name + " (Updated)",
//           }
//         : u
//     );

//     setUsers(updatedUsers);
//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     console.log("✅ After Update:", updatedUsers);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Users List
//       </h1>

//       {/* GRID */}
//       <div className="grid md:grid-cols-3 gap-6">

//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
//           >

//             {/* NAME */}
//             <h2 className="text-lg font-bold">{user.name}</h2>
//             <p className="text-gray-500">@{user.username}</p>

//             <p className="text-sm mt-2">{user.email}</p>
//             <p className="text-sm text-gray-500">{user.phone}</p>
//             <p className="text-sm text-gray-400">{user.address}</p>

//             {/* BUTTONS */}
//             <div className="flex justify-between mt-4">

//               {/* ✏️ UPDATE */}
//               <button
//                 onClick={() => handleUpdate(user)}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 Update
//               </button>

//               {/* 🗑 DELETE */}
//               <button
//                 onClick={() => handleDelete(user.id)}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>

//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }




