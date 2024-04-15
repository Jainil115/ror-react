import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

const EditScopeStack = ({ project, setFetch }) => {
  const [projectStack, setProjectStack] = useState(project.project_stack);
  const [projectScope, setProjectScope] = useState(project.project_scope);
  const [loading, setLoading] = useState(false);
  // const [saved, setSaved] = useState(false);
  const { myUser } = useContext(UserContext);

  const isAdminOrProjectManager =
    myUser &&
    (myUser.role === "admin" ||
      myUser.role === "project_manager" ||
      myUser.role === "auditor");

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/v1/projects/${project.id}`, {
        project_stack: projectStack,
        project_scope: projectScope,
      });
      setLoading(false);
      setFetch((prevFetch) => !prevFetch); // Trigger fetch to update project list
      toast.success("Scope and Stack updated successfully");
      // setSaved(true);
      // setTimeout(() => setSaved(false), 5000); // Hide saved message after 2 seconds
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
      // alert("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Scope and Stack</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Stack
        </label>
        <select
          value={projectStack}
          onChange={(e) => setProjectStack(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="mobile">Mobile App</option>
          <option value="database">Database</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Project Scope
        </label>
        <input
          type="text"
          value={projectScope}
          onChange={(e) => setProjectScope(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {isAdminOrProjectManager && (
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
};

export default EditScopeStack;
