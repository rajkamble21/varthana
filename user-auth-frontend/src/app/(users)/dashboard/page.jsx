"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserUpdateModal from "../../components/UserUpdateModal/UserUpdateModal";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../apiConfig/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const dashboard = () => {
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

        console.log(res.data.users);
        setUsers(res.data.users);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchUsers", error);
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
    try {
      const res = await axios.put(`${baseUrl}/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUsers(users.map((user) => (user.id == id ? res.data.user : user)));
        enqueueSnackbar(
          `User named ${res.data.user.name} updated successfully`,
          { variant: "success" }
        );
        setOpenModal(false);
      }
    } catch (error) {
      console.log("error in updateUser", error);
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
        enqueueSnackbar(
          `User named ${res.data.user.name} deleted successfully`,
          { variant: "success" }
        );
      }
    } catch (error) {
      console.log("error in deleteUser", error);

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
      <div className="container mx-auto p-6">
        <div className="rounded-lg w-full my-16 p-6 flex flex-col items-center gap-4 shadow-lg bg-gray-100">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-600">User List</h1>

            <input
              type="text"
              placeholder="Search by name..."
              className="max-w-xs p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full">
            {filteredUsers.length > 0 ? (
              <table className="w-full bg-white shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-green-500 text-white">
                    <th className="p-2 text-center">Name </th>
                    <th className="p-2 text-center">Email</th>
                    <th className="p-2 text-center">Phone</th>
                    <th className="p-2 text-center">City</th>
                    {role == "admin" && (
                      <th className="p-2 text-center">Edit/Delete</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-100 transition duration-300"
                    >
                      <td className="p-2 text-center">{user.name}</td>
                      <td className="p-2 text-center">{user.email}</td>
                      <td className="p-2 text-center">{user.phone}</td>
                      <td className="p-2 text-center">
                        {user.Address?.address.current_address?.city
                          ? user.Address?.address.current_address?.city
                          : "NA"}
                      </td>

                      {role == "admin" && (
                        <td className="flex gap-2 p-2 justify-center">
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
                            <FontAwesomeIcon icon={faTrash} />{" "}
                            <span>Delete</span>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : loading ? (
              <p className="text-lg text-center text-green-600">
                Loading users...
              </p>
            ) : (
              <p className="text-lg text-center text-green-600">
                Search results not found!
              </p>
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

export default dashboard;
