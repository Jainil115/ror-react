import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditResource from "./EditResource";
import AddResource from "./AddResource";
import { UserContext } from "../../contexts/UserContext";

function Resources({ project, setFetch }) {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/resources`
        );
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Error fetching resources");
      }
    };

    fetchResources();

    // Set interval to fetch resources every minute
    const intervalId = setInterval(fetchResources, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (resource) => {
    setSelectedResource(resource);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this resource?");
    if (confirmed) {
      try {
        await axios.delete(`/api/v1/projects/${project.id}/resources/${id}`);
        toast.success("Resource deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting resource:", error);
        toast.error("An error occurred while deleting the resource.");
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
              Resource Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Comment
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={resource.id}
            >
              <td className="px-6 py-4">{resource.resource_name}</td>
              <td className="px-6 py-4">{resource.role}</td>
              <td className="px-6 py-4">{resource.start_date}</td>
              <td className="px-6 py-4">{resource.end_date}</td>
              <td className="px-6 py-4">{resource.comment}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(resource)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(resource.id)}
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
      {selectedResource && (
        <EditResource
          resource={selectedResource}
          setFetch={setFetch}
          closeModal={() => setSelectedResource(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Resource
        </button>
      )}
      {addModalOpen && (
        <AddResource
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Resources;
