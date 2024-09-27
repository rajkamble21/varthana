"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSnackbar } from "notistack";
import { baseUrl } from "@/app/apiConfig/apiConfig";
import validateField from "./validateField";

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

  const validateAllFields = () => {
    let isValid = true;
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key], formData);
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

    const error = validateField(name, value, formData);
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
