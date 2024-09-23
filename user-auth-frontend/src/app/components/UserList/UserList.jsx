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
  const [role, setRole] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  let [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedToken = localStorage.getItem("token");
      if (!storedToken) {
        router.push("/login");
      }
      setToken(storedToken);
      console.log(localStorage.getItem("role"));
      setRole(localStorage.getItem("role"));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("fetchUsers", res.data);
        setUsers(res.data.users);
        setLoading(false);
      } catch (error) {
        let errorMessage = error.response?.data.message
          ? error.response.data.message
          : error.message;
        enqueueSnackbar(errorMessage, { variant: "error" });
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const updateUser = async (id, formData) => {
    console.log("updateUser", formData);
    try {
      const res = await axios.put(`${baseUrl}/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("updateUser", res.data);
      if (res.status === 200) {
        setUsers(users.map((user) => (user.id == id ? res.data.user : user)));
        enqueueSnackbar("User updated successfully", { variant: "success" });
        setOpenModal(false);
      }
    } catch (error) {
      let errorMessage = error.response?.data.message
        ? error.response.data.message
        : error.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
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
      let errorMessage = error.response?.data.message
        ? error.response.data.message
        : error.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="rounded-lg w-5/6 mx-auto my-16 p-6 flex flex-col items-center gap-4 shadow-lg bg-gray-100">
          <h1 className="text-2xl font-bold text-green-600">User List</h1>

          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="w-full">
            {filteredUsers.length > 0 ? (
              <>
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-lg shadow-md flex justify-between items-center p-4 my-4"
                  >
                    <p className="text-gray-800 text-lg">{user.name}</p>
                    {role == "admin" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setOpenModal(true);
                            setCurrentUser(user);
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />{" "}
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                        >
                          <FontAwesomeIcon icon={faTrash} /> <span>Delete</span>
                        </button>
                      </div>
                    )}
                    {role == "read" && (
                      <div>{user.Address.address.current_address.city}</div>
                    )}
                  </div>
                ))}
              </>
            ) : loading ? (
              <p className="text-gray-700">Loading users...</p>
            ) : (
              <div className="bg-white rounded-lg shadow-md flex justify-between items-center p-4 my-4">
                <p className="text-gray-800 text-lg">
                  Search results not found!
                </p>
              </div>
            )}
          </div>
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
