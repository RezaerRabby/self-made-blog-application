<div className="grid md:grid-cols-3 gap-6">
  {users.map((user) => (
    <div
      key={user.id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center text-center"
    >
      {/* Profile Image */}
      {/* <div className="w-20 h-20 relative mb-3">
        <img
          src={`/${user.profile_image}`}
          alt={user.name}
          className="w-full h-full object-cover rounded-full border-2 border-blue-500"
        />
      </div> */}

      {/* Name */}
      <h2 className="text-lg font-semibold text-gray-800">
        {user.name}
      </h2>

      {/* Username */}
      <p className="text-sm text-gray-500">@{user.username}</p>

      {/* Email */}
      <p className="text-sm text-gray-600 mt-1">
        {user.email}
      </p>

      {/* Phone */}
      <p className="text-xs text-gray-500 mt-1">
        {user.phone}
      </p>

      {/* Address */}
      <p className="text-xs text-gray-400 mt-1">
        {user.address}
      </p>

      {/* Role + Status */}
      <div className="flex gap-2 mt-3">
        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
          {user.role}
        </span>

        <span
          className={`px-2 py-1 text-xs rounded ${
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