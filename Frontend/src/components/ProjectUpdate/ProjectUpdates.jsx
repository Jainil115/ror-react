import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProjectUpdate from "./EditProjectUpdate";
import AddProjectUpdate from "./AddProjectUpdate";
import { UserContext } from "../../contexts/UserContext";

function ProjectUpdates({ project, setFetch }) {
  const [projectUpdates, setProjectUpdates] = useState([]);
  const [selectedProjectUpdate, setSelectedProjectUpdate] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchProjectUpdates = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/project_updates`
        );
        setProjectUpdates(response.data);
      } catch (error) {
        console.error("Error fetching project updates:", error);
      }
    };

    fetchProjectUpdates();

    // Set interval to fetch project updates every minute
    const intervalId = setInterval(fetchProjectUpdates, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (projectUpdate) => {
    setSelectedProjectUpdate(projectUpdate);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this project update?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/project_updates/${id}`
        );
        toast.success("Project update deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting project update:", error);
        toast.error("An error occurred while deleting the project update.");
      }
    }
  };

  const isAdminOrProjectManager =
    myUser && (myUser.role === "admin" || myUser.role === "projectmanager");

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              General Updates
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projectUpdates.map((projectUpdate) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={projectUpdate.id}
            >
              <td className="px-6 py-4">{projectUpdate.date}</td>
              <td className="px-6 py-4">{projectUpdate.general_updates}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(projectUpdate)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(projectUpdate.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedProjectUpdate && (
        <EditProjectUpdate
          projectUpdate={selectedProjectUpdate}
          setFetch={setFetch}
          closeModal={() => setSelectedProjectUpdate(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Project Update
        </button>
      )}
      {addModalOpen && (
        <AddProjectUpdate
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProjectUpdates;
