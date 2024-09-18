"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserList.module.css";
import { useRouter } from "next/navigation";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  if (!localStorage.getItem("token")) {
    router.push("login");
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
    <div className={styles.userContainer}>
      <h1 className={styles.title}>User List</h1>
      {loading && <p>Loading users...</p>}
      {error && <p>Error loading users: {error}</p>}
      <div className={styles.userList}>
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id} className={styles.userItem}>
              {user.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;
