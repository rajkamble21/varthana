"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserUpdateModal from "../UserUpdateModal/UserUpdateModal";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../apiConfig/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  let token = null;

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data.users);
        setLoading(false);
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUser = async (id, formData) => {
    try {
      const res = await axios.patch(`${baseUrl}/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUsers(users.map((user) => (user.id == id ? res.data.user : user)));
        enqueueSnackbar("User updated successfully", { variant: "success" });
        setOpenModal(false);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id != id));
        enqueueSnackbar("User deleted successfully", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  return (
    <>
      <div className="border border-gray-300 rounded-lg w-4/5 mx-auto mt-16 p-6 flex flex-col items-center gap-4 shadow-lg bg-gray-100">
        <h1 className="text-2xl font-bold text-green-600">User List</h1>
        {loading && <p className="text-gray-700">Loading users...</p>}
        <div className="w-full">
          {users.length > 0 &&
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-lg shadow-md flex justify-between p-4 my-4"
              >
                <p className="text-gray-800">{user.name}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setCurrentUser(user);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> <span>Edit</span>
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faTrash} /> <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {openModal && (
        <UserUpdateModal
          user={currentUser}
          setOpenModal={setOpenModal}
          updateUser={updateUser}
        />
      )}
    </>
  );
};

export default UserList;
