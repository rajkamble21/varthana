"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  if (!localStorage.getItem("token")) {
    router.push("/login");
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data.users);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg w-4/5 mx-auto mt-16 p-6 flex flex-col items-center gap-4 shadow-lg bg-gray-100">
      <h1 className="text-2xl font-bold text-green-600">User List</h1>
      {loading && <p className="text-gray-700">Loading users...</p>}
      {error && <p className="text-red-500">Error loading users: {error}</p>}
      <div className="w-full">
        {users.length > 0 &&
          users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md flex justify-between p-4 my-4"
            >
              <p className="text-gray-800">{user.name}</p>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-300">
                  <i className="fa-solid fa-pen-to-square"></i> <span>Edit</span>
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300">
                  <i className="fa-solid fa-trash"></i> <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
