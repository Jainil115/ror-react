import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditClientFeedback from "./EditClientFeedback";
import AddClientFeedback from "./AddClientFeedback";
import { UserContext } from "../../contexts/UserContext";

function ClientFeedback({ project, setFetch }) {
  const [clientFeedbacks, setClientFeedbacks] = useState([]);
  const [selectedClientFeedback, setSelectedClientFeedback] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchClientFeedbacks = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/client_feedbacks`
        );
        setClientFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching client feedbacks:", error);
      }
    };

    fetchClientFeedbacks();

    // Set interval to fetch client feedbacks every minute
    const intervalId = setInterval(fetchClientFeedbacks, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (clientFeedback) => {
    setSelectedClientFeedback(clientFeedback);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this client feedback?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/client_feedbacks/${id}`
        );
        toast.success("Client feedback deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting client feedback:", error);
        toast.error("An error occurred while deleting the client feedback.");
      }
    }
  };

  const isAdminOrProjectManager =
    myUser && (myUser.role === "admin" || myUser.role === "projectmanager");

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Feedback Type
            </th>
            <th scope="col" className="px-6 py-3">
              Date Received
            </th>
            <th scope="col" className="px-6 py-3">
              Detailed Feedback
            </th>
            <th scope="col" className="px-6 py-3">
              Action Taken
            </th>
            <th scope="col" className="px-6 py-3">
              Closure Date
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {clientFeedbacks.map((clientFeedback) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={clientFeedback.id}
            >
              <td className="px-6 py-4">{clientFeedback.feedback_type}</td>
              <td className="px-6 py-4">{clientFeedback.date_received}</td>
              <td className="px-6 py-4">{clientFeedback.detailed_feedback}</td>
              <td className="px-6 py-4">{clientFeedback.action_taken}</td>
              <td className="px-6 py-4">{clientFeedback.closure_date}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(clientFeedback)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(clientFeedback.id)}
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
      {selectedClientFeedback && (
        <EditClientFeedback
          clientFeedback={selectedClientFeedback}
          setFetch={setFetch}
          closeModal={() => setSelectedClientFeedback(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Client Feedback
        </button>
      )}
      {addModalOpen && (
        <AddClientFeedback
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ClientFeedback;
