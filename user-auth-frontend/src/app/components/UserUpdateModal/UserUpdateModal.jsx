"use client";
import React, { useState } from "react";

const UserUpdateModal = ({ user, setOpenModal, updateUser }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    permanent_address: user.permanent_address || "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    permanent_address: "",
  });

  const [isSameAddress, setIsSameAddress] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSameAddress = () => {
    if (!isSameAddress) {
      setFormData({ ...formData, permanent_address: formData.address });
      setIsSameAddress(true);
    } else {
      setFormData({ ...formData, permanent_address: user.permanent_address });
      setIsSameAddress(false);
    }
  };

  const validateFields = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name) {
      errors.name = "Name is required!";
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required!";
      isValid = false;
    } else if (!formData.phone.match(/^[0-9]{10}$/)) {
      errors.phone = "Phone number must have 10 digits";
      isValid = false;
    }

    if (!formData.address) {
      errors.address = "Address field is required!";
      isValid = false;
    } else if (formData.address.length < 15) {
      errors.address = "Address must be greater than 15 character!";
      isValid = false;
    }

    if (!formData.permanent_address) {
      errors.permanent_address = "Permanent address field is required!";
      isValid = false;
    } else if (formData.permanent_address.length < 15) {
      errors.permanent_address =
        "Permanent address must be greater than 15 character!";
      isValid = false;
    }

    setFieldErrors(errors);

    return isValid;
  };

  const handleUpdateUser = (id, formData) => {
    console.log(validateFields());
    if (validateFields()) {
      updateUser(id, formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
            {fieldErrors.address && (
              <p className="text-red-500 text-sm">{fieldErrors.address}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isSameAddress}
                onChange={handleSameAddress}
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Same as Address
              </span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Permanent Address
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              type="text"
              name="permanent_address"
              value={formData.permanent_address}
              onChange={handleChange}
              placeholder="Enter permanent address"
              disabled={isSameAddress}
            />
            {fieldErrors.permanent_address && (
              <p className="text-red-500 text-sm">
                {fieldErrors.permanent_address}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
              onClick={() => handleUpdateUser(user.id, formData)}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateModal;
