"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState(null);

  const validateFields = () => {
    let errors = {};
    let isValid = true;
    if (!formData.name) {
      errors.name = "Name is required!";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required!";
      isValid = false;
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "password is required!";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "password must be 6 characters long";
      isValid = false;
    } else if (!formData.password.match(/\d/)) {
      errors.password = "password must contain at least one number";
      isValid = false;
    } else if (!formData.password.match(/[a-zA-Z]/)) {
      errors.password = "password must contain at leats one alphabate";
      isValid = false;
    } else if (!formData.password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?]/)) {
      errors.password = "password must contain at least on especial character";
    }

    if (!formData.phone) {
      errors.phone = "phone number is required!";
      isValid = false;
    } else if (!formData.phone.match(/^[0-9]{10}$/)) {
      errors.phone = "Phone number must have 10 digits";
      isValid = false;
    }

    setFieldErrors(errors);

    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
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
      <h2 className={styles.heading}>Registration Form</h2>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        ></input>
        {fieldErrors.name && (
          <p className={styles.errorMessage}>{fieldErrors.name}</p>
        )}
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        {fieldErrors.email && (
          <p className={styles.errorMessage}>{fieldErrors.email}</p>
        )}
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Enter you password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        {fieldErrors.password && (
          <p className={styles.errorMessage}>{fieldErrors.password}</p>
        )}
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          name="phone"
          placeholder="Enter you phone"
          value={formData.phone}
          onChange={handleChange}
        ></input>
        {fieldErrors.phone && (
          <p className={styles.errorMessage}>{fieldErrors.phone}</p>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
      {message && <div className={styles.message}>{message}</div>}
    </form>
  );
};

export default RegisterForm;
