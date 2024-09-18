"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const validateFields = () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    console.log("formData", formData);
    if (validateFields()) {
      try {
        const res = await axios.post(
          `http://localhost:4000/auth/login`,
          formData
        );

        console.log(res);
        if (res.status === 200) {
          setMessage(res.data.message);
          localStorage.setItem("token", res.data.token);
          router.push("/");
        }
      } catch (error) {
        console.log("error in handleLogin", error);
        setError(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form className={styles.formContainer} onSubmit={handleLogin} noValidate>
      <input
        className={styles.input}
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      ></input>
      <input
        className={styles.input}
        type="password"
        name="password"
        placeholder="Enter you password"
        value={formData.password}
        onChange={handleChange}
      ></input>
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
      {message && <div className={styles.message}>{message}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default LoginForm;
