"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterForm.module.css"

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const validateFields = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      setError("All fields are required");
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Invalid email format");
      return false;
    }

    if (formData.password.length < 6) {
      setError("password must be 6 characters long");
      return false;
    } else if (!formData.password.match(/\d/)) {
      setError("password must contain at least one number");
      return false;
    } else if (!formData.password.match(/[a-zA-Z]/)) {
      setError("password must contain at least one alphabate");
      return false;
    } else if (!formData.password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?]/)) {
      setError("password must contain at least one special character");
      return false;
    }

    if (!formData.phone.match(/^[0-9]{10}$/)) {
      setError("Phone number must have 10 digits");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    if (validateFields()) {
      try {
        const res = await axios.post(
          `http://localhost:4000/auth/register`,
          formData
        );

        console.log(res);
        if (res.status === 201) {
          setMessage(res.data.message);
          setFormData({ name: "", email: "", password: "", phone: "" });
        }
      } catch (error) {
        console.log("error in handleRegister", error);
        setError(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form onSubmit={handleRegister} className={styles.formContainer} noValidate>
      <input
        className={styles.input}
        type="text"
        name="name"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
      ></input>
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
      <input
        className={styles.input}
        type="text"
        name="phone"
        placeholder="Enter you phone"
        value={formData.phone}
        onChange={handleChange}
      ></input>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
      {message && <div className={styles.message}>{message}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default RegisterForm;
