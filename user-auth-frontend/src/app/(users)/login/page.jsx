"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSnackbar } from "notistack";
import { baseUrl } from "@/app/apiConfig/apiConfig";

const Login = () => {
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

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateAllFields()) {
      try {
        const res = await axios.post(`${baseUrl}/auth/login`, formData);

        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user.Master.role);
          enqueueSnackbar("Login successfull!", { variant: "success" });
          router.push("/dashboard");
        }
      } catch (error) {
        console.log("error in handleLogin", error);
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
      className="flex flex-col max-w-md mx-auto p-8 mt-24 bg-white border border-gray-300 rounded-lg shadow-lg"
      onSubmit={handleLogin}
      noValidate
    >
      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
        Login Form
      </h2>
      <div className="mb-4 flex flex-col gap-2">
        <input
          className="px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        {fieldErrors.email && (
          <p className="text-sm text-red-500">{fieldErrors.email}</p>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <input
          className="px-4 py-3  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        {fieldErrors.password && (
          <p className="text-sm text-red-500">{fieldErrors.password}</p>
        )}
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
