"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

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

  const { enqueueSnackbar } = useSnackbar();

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
      errors.password = "Password is required!";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else if (!formData.password.match(/\d/)) {
      errors.password = "Password must contain at least one number";
      isValid = false;
    } else if (!formData.password.match(/[a-zA-Z]/)) {
      errors.password = "Password must contain at least one alphabet";
      isValid = false;
    } else if (!formData.password.match(/[!@#$%^&*()_+{}\[\]:;<>,.?]/)) {
      errors.password = "Password must contain at least one special character";
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required!";
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

    if (validateFields()) {
      try {
        const res = await axios.post(
          `http://localhost:4000/auth/register`,
          formData
        );

        if (res.status === 201) {
          setFormData({ name: "", email: "", password: "", phone: "" });
          enqueueSnackbar("Registration successful! Please Login", {
            variant: "success",
          });
        }
      } catch (error) {
        console.log("error in handleRegister", error);
        let errorMessage = error.response?.data.message
          ? error.response.data.message
          : error.message;
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-24 bg-white p-6 shadow-lg rounded-lg"
      noValidate
    >
      <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
        Registration Form
      </h2>

      <div className="mb-4">
        <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        {fieldErrors.name && (
          <p className="text-red-500 text-sm">{fieldErrors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {fieldErrors.email && (
          <p className="text-red-500 text-sm">{fieldErrors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        {fieldErrors.password && (
          <p className="text-red-500 text-sm">{fieldErrors.password}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        {fieldErrors.phone && (
          <p className="text-red-500 text-sm">{fieldErrors.phone}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
