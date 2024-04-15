import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditUser({ user, setUsers, closeModal }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      role,
    };

    try {
      await axios.put(`/api/v1/users/${user.id}`, updatedUser);
      toast.success("User updated successfully.");
      // Update the users list after successful update
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, ...updatedUser } : u))
      );
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("An error occurred while updating the user.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            >
              <option value="admin">Admin</option>
              <option value="auditor">Auditor</option>
              <option value="client">Client</option>
              <option value="projectmanager">Project Manager</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
