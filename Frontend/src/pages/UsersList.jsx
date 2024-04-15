import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditUser from "../components/EditUser"; // Import the EditUser component

function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users");
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    const intervalId = setInterval(fetchUsers, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this user?");
    if (confirmed) {
      try {
        await axios.delete(`/api/v1/users/${id}`);
        toast.success("User deleted successfully.");
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("An error occurred while deleting the user.");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={user.id}>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                <button
                  className="text-blue-600"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {selectedUser && (
        <EditUser
          user={selectedUser}
          setUsers={setUsers}
          closeModal={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default UsersList;
