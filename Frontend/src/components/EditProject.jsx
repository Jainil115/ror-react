import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProject = ({ project, setFetch, closeModal }) => {
  const [projectName, setProjectName] = useState(project.project_name);
  const [projectDesc, setProjectDesc] = useState(project.project_desc);
  const [projectScope, setProjectScope] = useState(project.project_scope);
  const [projectStack, setProjectStack] = useState(project.project_stack);
  const [projectManager, setProjectManager] = useState(project.project_manager);
  const [projectStatus, setProjectStatus] = useState(project.project_status);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/v1/projects/${project.id}`, {
        project_name: projectName,
        project_desc: projectDesc,
        project_scope: projectScope,
        project_stack: projectStack,
        project_status: projectStatus,
        project_manager: projectManager,
      });
      toast.success("Project updated successfully");
      setLoading(false);
      setFetch(true); // Trigger fetch to update project list
      closeModal(); // Close the modal after successful update
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
      // alert("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-white rounded-lg p-10 w-96 flex flex-col items-center">
        <div className="modal-content">
          <h2 className="text-lg font-semibold mb-4 text-black">
            Edit Project
          </h2>
          <input
            type="text"
            placeholder="Project Name"
            className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500"
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Project Scope"
            className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={projectScope}
            onChange={(e) => setProjectScope(e.target.value)}
            required
          />
          <select
            required
            className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={projectStack}
            onChange={(e) => setProjectStack(e.target.value)}
          >
            <option value="">Select Project Stack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="mobile">Mobile App</option>
            <option value="database">Database</option>
          </select>
          <select
            required
            className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={projectStatus}
            onChange={(e) => setProjectStatus(e.target.value)}
          >
            <option value="">Select Project Status</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
            <option value="On hold">On hold</option>
          </select>
          <select
            required
            className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
          >
            <option value="">Select Project Manager</option>
            <option value="Dipa Majumdar">Dipa Majumdar</option>
            <option value="Firoja Parveen">Firoja Parveen</option>
          </select>

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
