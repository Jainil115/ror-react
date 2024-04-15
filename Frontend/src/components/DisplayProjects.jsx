import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProject from "./EditProject";
import { UserContext } from "../contexts/UserContext";

function DisplayProjects({ fetch, setFetch }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/projects");
        setProjects(response.data);
      } catch (error) {
        // use toast to show error message
        toast.error("Error fetching projects");
        console.error("Error fetching projects:", error);
      }
    };

    fetchData(); // Fetch data initially

    // Refresh data every six seconds
    const intervalId = setInterval(fetchData, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetch]);

  async function handleDelete(id) {
    console.log("Delete id:", id);
    const confirmed = window.confirm("Do you want to delete?");

    if (confirmed) {
      try {
        const response = await axios.delete(`/api/v1/projects/${id}`);
        // toast.success(response.data.message);
        toast.success("Project deleted successfully");
        setFetch((prev) => !prev);
      } catch (error) {
        toast.error("Error deleting project");
        console.log(error);
      }
    }
  }

  const handleEdit = (project) => {
    setSelectedProject(project);
    setEditModalOpen(true); // Open the edit modal
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setEditModalOpen(false); // Close the edit modal
  };

  const canEditAndDelete =
    myUser && (myUser.role === "admin" || myUser.role === "auditor");

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        {/* Table header */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project name
            </th>
            <th scope="col" className="px-6 py-3">
              Stack
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Project manager
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {projects.length > 0 &&
            projects.map((project) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={project.id}
              >
                {/* Table row cells */}
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {project.project_name}
                </td>
                <td className="px-6 py-4">{project.project_stack}</td>
                <td className="px-6 py-4">{project.project_status}</td>
                <td className="px-6 py-4">{project.project_manager}</td>
                {/* Edit and delete buttons */}
                {canEditAndDelete && (
                  <td className="px-6 py-4 text-right flex gap-2">
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit modal */}
      {selectedProject && (
        <EditProject
          project={selectedProject}
          setFetch={setFetch}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default DisplayProjects;
