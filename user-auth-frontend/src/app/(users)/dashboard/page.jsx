"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserUpdateModal from "../../components/UserUpdateModal/UserUpdateModal";
import UserDeleteModal from "../../components/UserDeleteModal/UserDeleteModal";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../apiConfig/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faUpload,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
        if (errorMessage === "Invalid token") {
          localStorage.clear();
          router.push("/login");
        }
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
        setOpenDeleteModal(false);
      }
    } catch (error) {
      console.log("error in deleteUser", error);

      let errorMessage = error.response?.data.message
        ? error.response.data.message
        : error.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const addUsersInBulk = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/users/bulk-add`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log(res.data.createdUsers);
        setUsers([...users, ...res.data.createdUsers]);
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      console.log("error in addUsersInBulk", error);
      let errorMessage = error.response?.data.message
        ? error.response.data.message
        : error.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const downloadExcel = () => {
    const requiredColumns = users.map((user) => ({
      name: user.name,
      email: user.email,
      phone: user.phone,
      current_street: user.Address.address.current_address?.street,
      current_city: user.Address.address.current_address?.city,
      current_state: user.Address.address.current_address?.state,
      current_pincode: user.Address.address.current_address?.pincode,
      permanent_street: user.Address.address.permanent_address?.street,
      permanent_city: user.Address.address.permanent_address?.city,
      permanent_state: user.Address.address.permanent_address?.state,
      permanent_pincode: user.Address.address.permanent_address?.pincode,
    }));
    console.log(requiredColumns);
    const worksheet = XLSX.utils.json_to_sheet(requiredColumns);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users.xlsx");
  };

  const uploadExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = ({ target: { result } }) => {
      const workbook = XLSX.read(new Uint8Array(result), { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let users = XLSX.utils.sheet_to_json(worksheet);
      users = users.map((user) => ({
        ...user,
        phone: String(user.phone),
        current_pincode: String(user.current_pincode),
        permanent_pincode: String(user.permanent_pincode),
      }));
      let data = { users };
      console.log("uploadExcel", data);
      addUsersInBulk(data);
    };
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="rounded-lg w-full my-16 p-6 flex flex-col items-center gap-4 shadow-lg bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-600">User List</h1>
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full lg:w-1/3 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {role == "admin" && (
              <div className="flex gap-2">
                <button
                  onClick={downloadExcel}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                <label className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-600 cursor-pointer inline-flex items-center">
                  <FontAwesomeIcon icon={faUpload} />
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={uploadExcel}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="w-full">
            {filteredUsers.length > 0 ? (
              <table className="w-full bg-white shadow-lg rounded-lg">
                <thead>
                  <tr className="bg-green-500 text-white">
                    <th className="p-2 text-center">Sr. No.</th>
                    <th className="p-2 text-center">Name </th>
                    <th className="p-2 text-center">Email</th>
                    <th className="p-2 text-center">Phone</th>
                    <th className="p-2 text-center">City</th>
                    <th className="p-2 text-center">State</th>
                    {role == "admin" && (
                      <th className="p-2 text-center">Edit/Delete</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-100 transition duration-300"
                    >
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2 text-center">{user.name}</td>
                      <td className="p-2 text-center">{user.email}</td>
                      <td className="p-2 text-center">{user.phone}</td>
                      <td className="p-2 text-center">
                        {user.Address?.address.current_address?.city
                          ? user.Address?.address.current_address?.city
                          : "NA"}
                      </td>
                      <td className="p-2 text-center">
                        {user.Address?.address.current_address?.state
                          ? user.Address?.address.current_address?.state
                          : "NA"}
                      </td>

                      {role == "admin" && (
                        <td className="flex gap-4 p-2 justify-center">
                          <button
                            onClick={() => {
                              setOpenModal(true);
                              setCurrentUser(user);
                            }}
                            className=" text-green-500 hover:text-green-600 text-xl"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />{" "}
                          </button>
                          <button
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setCurrentUser(user);
                            }}
                            className=" text-red-500 hover:text-red-600 text-xl"
                          >
                            <FontAwesomeIcon icon={faTrash} />{" "}
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
      {openDeleteModal && (
        <UserDeleteModal
          user={currentUser}
          setOpenDeleteModal={setOpenDeleteModal}
          deleteUser={deleteUser}
        />
      )}
    </>
  );
};

export default dashboard;
