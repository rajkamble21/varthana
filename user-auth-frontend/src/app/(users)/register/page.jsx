"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSnackbar } from "notistack";
import { baseUrl } from "@/app/apiConfig/apiConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validateField = (name, value) => {
    let error = "";

    value = value.trim();

    switch (name) {
      case "name": {
        if (!value) {
          error = "Name is required!";
        }
        break;
      }
      case "email": {
        if (!value) {
          error = "Email is required!";
        } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          error = "Invalid email format!";
        }
        break;
      }

      case "password": {
        if (!value) {
          error = "Password is required!";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters long";
        } else if (!value.match(/\d/)) {
          error = "Password must contain at least one number";
        } else if (!value.match(/[a-zA-Z]/)) {
          error = "Password must contain at least one alphabet";
        } else if (!value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?]/)) {
          error = "Password must contain at least one special character";
        }
        break;
      }

      case "confirm_password": {
        if (!value) {
          error = "Confirm password is required!";
        } else if (value != formData.password) {
          error = "password & confirm password is not same!";
        }
        break;
      }

      case "phone": {
        if (!value) {
          error = "Phone number is required!";
        } else if (!value.match(/^[0-9]{10}$/)) {
          error = "Phone number must have 10 digits";
        }
        break;
      }

      default: {
        break;
      }
    }

    return error;
  };

  const validateAllFields = () => {
    let isValid = true;
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        errors[key] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);

    return isValid;
  };

  const trimFormData = (data) => {
    const trimmedData = {};
    for (const key in data) {
      if (typeof data[key] === "string") {
        trimmedData[key] = data[key].trim();
      } else {
        trimmedData[key] = data[key];
      }
    }
    return trimmedData;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { confirm_password, ...restFormData } = formData;
    const uploadFormData = trimFormData(restFormData);

    if (validateAllFields()) {
      try {
        const res = await axios.post(
          `${baseUrl}/auth/register`,
          uploadFormData
        );

        if (res.status === 201) {
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            confirm_password: "",
          });
          enqueueSnackbar("Registration successful! Please Login", {
            variant: "success",
          });
          router.push("/login");
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

    const error = validateField(name, value);
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
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
          type="password"
          name="confirm_password"
          placeholder="Enter password again"
          value={formData.confirm_password}
          onChange={handleChange}
        />
        {fieldErrors.confirm_password && (
          <p className="text-red-500 text-sm">{fieldErrors.confirm_password}</p>
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

export default Register;
