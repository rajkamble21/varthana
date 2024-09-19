"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./LoginForm.module.css";
import { useSnackbar } from "notistack";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validateFields = () => {
    let errors = {};
    let isValid = true;

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
    }

    setFieldErrors(errors);

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const res = await axios.post(
          `http://localhost:4000/auth/login`,
          formData
        );

        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          enqueueSnackbar("Login successful!", { variant: "success" });
          router.push("/");
        }
      } catch (error) {
        console.log("error in handleLogin", error);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form className={styles.formContainer} onSubmit={handleLogin} noValidate>
      <h2 className={styles.heading}>Login Form</h2>
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
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
