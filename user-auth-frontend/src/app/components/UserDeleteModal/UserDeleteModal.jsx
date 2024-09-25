import React from "react";

const UserDeleteModal = ({ user, setOpenDeleteModal, deleteUser }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="container mx-auto flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <p className="text-lg font-normal mb-4 text-center">
            Do you want to delete this user
          </p>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;
