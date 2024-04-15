import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditVersionHistory from "./EditVersionHistory";
import AddVersionHistory from "./AddVersionHistory";
import { UserContext } from "../../contexts/UserContext";

function VersionHistory({ project, setFetch }) {
  const [versionHistories, setVersionHistories] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchVersionHistories = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/version_histories`
        );
        setVersionHistories(response.data);
      } catch (error) {
        console.error("Error fetching version histories:", error);
      }
    };

    fetchVersionHistories();

    // Set interval to fetch version histories every minute
    const intervalId = setInterval(fetchVersionHistories, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (version) => {
    setSelectedVersion(version);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this version history?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/version_histories/${id}`
        );
        toast.success("Version history deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting version history:", error);
        toast.error("An error occurred while deleting the version history.");
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
              Version No
            </th>
            <th scope="col" className="px-6 py-3">
              Version Type
            </th>
            <th scope="col" className="px-6 py-3">
              Change
            </th>
            <th scope="col" className="px-6 py-3">
              Reason
            </th>
            <th scope="col" className="px-6 py-3">
              Created By
            </th>
            <th scope="col" className="px-6 py-3">
              Revision Date
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {versionHistories.map((version) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={version.id}>
              <td className="px-6 py-4">{version.version_no}</td>
              <td className="px-6 py-4">{version.version_type}</td>
              <td className="px-6 py-4">{version.change}</td>
              <td className="px-6 py-4">{version.reason}</td>
              <td className="px-6 py-4">{version.created_by}</td>
              <td className="px-6 py-4">{version.revision_date}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(version)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(version.id)}
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
      {selectedVersion && (
        <EditVersionHistory
          versionHistory={selectedVersion}
          setFetch={setFetch}
          closeModal={() => setSelectedVersion(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Version
        </button>
      )}
      {addModalOpen && (
        <AddVersionHistory
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default VersionHistory;
