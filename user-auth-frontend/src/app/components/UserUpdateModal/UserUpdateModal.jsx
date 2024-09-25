"use client";
import React, { useState } from "react";
import validateField from "./validateField";

const UserUpdateModal = ({ user, setOpenModal, updateUser }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    current_street: user.Address?.address.current_address?.street || "",
    current_city: user.Address?.address.current_address?.city || "",
    current_state: user.Address?.address.current_address?.state || "",
    current_pincode: user.Address?.address.current_address?.pincode || "",
    permanent_street: user.Address?.address.permanent_address?.street || "",
    permanent_city: user.Address?.address.permanent_address?.city || "",
    permanent_state: user.Address?.address.permanent_address?.state || "",
    permanent_pincode: user.Address?.address.permanent_address?.pincode || "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    phone: "",
    current_street: "",
    current_city: "",
    current_state: "",
    current_pincode: "",
    permanent_street: "",
    permanent_city: "",
    permanent_state: "",
    permanent_pincode: "",
  });

  const [isSameAddress, setIsSameAddress] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (isSameAddress) {
        if (name.startsWith("current_")) {
          const fieldName = name.replace("current_", "permanent_");
          updatedData[fieldName] = value;
        }
      }

      return updatedData;
    });

    setFieldErrors((prevErrors) => {
      const error = validateField(name, value);
      const updatedErrors = { ...prevErrors, [name]: error };

      if (isSameAddress) {
        if (name.startsWith("current_")) {
          const permanentFieldName = name.replace("current_", "permanent_");
          const permanentError = validateField(permanentFieldName, value);
          updatedErrors[permanentFieldName] = permanentError;
        }
      }
      return updatedErrors;
    });
  };

  const handleCheckboxChange = () => {
    setIsSameAddress((prevValue) => {
      const newValue = !prevValue;

      if (newValue) {
        setFormData((prevData) => ({
          ...prevData,
          permanent_street: prevData.current_street,
          permanent_city: prevData.current_city,
          permanent_state: prevData.current_state,
          permanent_pincode: prevData.current_pincode,
        }));
        const errors = { ...fieldErrors };
        [
          "current_street",
          "current_city",
          "current_state",
          "current_pincode",
        ].forEach((field) => {
          const error = validateField(field, formData[field]);
          if (error) {
            errors[field] = error;
            const permanentField = field.replace("current_", "permanent_");
            errors[permanentField] = error;
          } else {
            const permanentField = field.replace("current_", "permanent_");
            errors[permanentField] = "";
          }
        });
        setFieldErrors(errors);
      }

      return newValue;
    });
  };

  const handleUpdateUser = (id, formData) => {
    if (validateAllFields()) {
      updateUser(id, formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="container mx-auto flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Update User Details
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-sm">{fieldErrors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2 cursor-not-allowed"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                required
              />
              {fieldErrors.phone && (
                <p className="text-red-500 text-sm">{fieldErrors.phone}</p>
              )}
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Current address
            </label>
            <input
              className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2"
              type="text"
              name="current_street"
              value={formData.current_street}
              onChange={handleChange}
              placeholder="Enter street"
            />
            {fieldErrors.current_street && (
              <p className="text-red-500 text-sm">
                {fieldErrors.current_street}
              </p>
            )}
            <div className="flex gap-2">
              <div className="mb-4">
                <input
                  className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2"
                  type="text"
                  name="current_city"
                  value={formData.current_city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
                {fieldErrors.current_city && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.current_city}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2"
                  type="text"
                  name="current_pincode"
                  value={formData.current_pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                />
                {fieldErrors.current_pincode && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.current_pincode}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  className="mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2"
                  type="text"
                  name="current_state"
                  value={formData.current_state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
                {fieldErrors.current_state && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.current_state}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isSameAddress}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  parmanent address is same as address
                </span>
              </label>
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Permanent address
            </label>
            <input
              className={`mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2 ${
                isSameAddress ? `cursor-not-allowed` : ``
              }`}
              type="text"
              name="permanent_street"
              value={formData.permanent_street}
              onChange={handleChange}
              placeholder="Enter street"
              disabled={isSameAddress}
            />
            {fieldErrors.permanent_street && (
              <p className="text-red-500 text-sm">
                {fieldErrors.permanent_street}
              </p>
            )}
            <div className="flex gap-2">
              <div className="mb-4">
                <input
                  className={`mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2 ${
                    isSameAddress ? `cursor-not-allowed` : ``
                  }`}
                  type="text"
                  name="permanent_city"
                  value={formData.permanent_city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  disabled={isSameAddress}
                />
                {fieldErrors.permanent_city && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.permanent_city}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  className={`mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2 ${
                    isSameAddress ? `cursor-not-allowed` : ``
                  }`}
                  type="text"
                  name="permanent_pincode"
                  value={formData.permanent_pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  disabled={isSameAddress}
                />
                {fieldErrors.permanent_pincode && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.permanent_pincode}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  className={`mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm p-2 ${
                    isSameAddress ? `cursor-not-allowed` : ``
                  }`}
                  type="text"
                  name="permanent_state"
                  value={formData.permanent_state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  disabled={isSameAddress}
                />
                {fieldErrors.permanent_state && (
                  <p className="text-red-500 text-sm">
                    {fieldErrors.permanent_state}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={() => handleUpdateUser(user.id, formData)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateModal;
