import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditPhase from "./EditPhases";
import AddPhase from "./AddPhases";
import { UserContext } from "../../contexts/UserContext";

function Phases({ project, setFetch }) {
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/phases`
        );
        setPhases(response.data);
      } catch (error) {
        console.error("Error fetching phases:", error);
        toast.error("An error occurred while fetching phases.");
      }
    };

    fetchPhases();

    // Set interval to fetch phases every minute
    const intervalId = setInterval(fetchPhases, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (phase) => {
    setSelectedPhase(phase);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this phase?");
    if (confirmed) {
      try {
        await axios.delete(`/api/v1/projects/${project.id}/phases/${id}`);
        toast.success("Phase deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting phase:", error);
        toast.error("An error occurred while deleting the phase.");
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
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              Completion Date
            </th>
            <th scope="col" className="px-6 py-3">
              Approval Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Revised Completion Date
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
          {phases.map((phase) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={phase.id}>
              <td className="px-6 py-4">{phase.title}</td>
              <td className="px-6 py-4">{phase.start_date}</td>
              <td className="px-6 py-4">{phase.completion_date}</td>
              <td className="px-6 py-4">{phase.approval_date}</td>
              <td className="px-6 py-4">{phase.status}</td>
              <td className="px-6 py-4">{phase.revised_completion_date}</td>
              <td className="px-6 py-4">{phase.comments}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(phase)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(phase.id)}
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
      {selectedPhase && (
        <EditPhase
          phase={selectedPhase}
          setFetch={setFetch}
          closeModal={() => setSelectedPhase(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Phase
        </button>
      )}
      {addModalOpen && (
        <AddPhase
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Phases;
