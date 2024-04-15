import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditSprintDetail from "./EditSprintDetails";
import AddSprintDetail from "./AddSprintDetails";
import { UserContext } from "../../contexts/UserContext";

function SprintDetails({ project, setFetch }) {
  const [sprintDetails, setSprintDetails] = useState([]);
  const [selectedSprintDetail, setSelectedSprintDetail] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchSprintDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/sprint_details`
        );
        setSprintDetails(response.data);
      } catch (error) {
        console.error("Error fetching sprint details:", error);
        toast.error("An error occurred while fetching sprint details.");
      }
    };

    fetchSprintDetails();

    // Set interval to fetch sprint details every minute
    const intervalId = setInterval(fetchSprintDetails, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (sprintDetail) => {
    setSelectedSprintDetail(sprintDetail);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this sprint detail?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/sprint_details/${id}`
        );
        toast.success("Sprint detail deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting sprint detail:", error);
        toast.error("An error occurred while deleting the sprint detail.");
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
              Sprint
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sprintDetails.map((sprintDetail) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={sprintDetail.id}
            >
              <td className="px-6 py-4">{sprintDetail.sprint}</td>
              <td className="px-6 py-4">{sprintDetail.start_date}</td>
              <td className="px-6 py-4">{sprintDetail.end_date}</td>
              <td className="px-6 py-4">{sprintDetail.status}</td>
              <td className="px-6 py-4">{sprintDetail.comments}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(sprintDetail)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(sprintDetail.id)}
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
      {selectedSprintDetail && (
        <EditSprintDetail
          sprintDetail={selectedSprintDetail}
          setFetch={setFetch}
          closeModal={() => setSelectedSprintDetail(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Sprint Detail
        </button>
      )}
      {addModalOpen && (
        <AddSprintDetail
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default SprintDetails;
