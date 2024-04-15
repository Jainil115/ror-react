import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EditRiskProfile from "./EditRiskProfile";
import AddRiskProfile from "./AddRiskProfile";
import { UserContext } from "../../contexts/UserContext";

function RiskProfiling({ project, setFetch }) {
  const [riskProfiles, setRiskProfiles] = useState([]);
  const [selectedRiskProfile, setSelectedRiskProfile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchRiskProfiles = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/risk_profilings`
        );
        setRiskProfiles(response.data);
      } catch (error) {
        console.error("Error fetching risk profiles:", error);
        toast.error("An error occurred while fetching risk profiles.");
      }
    };

    fetchRiskProfiles();

    // Set interval to fetch risk profiles every minute
    const intervalId = setInterval(fetchRiskProfiles, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (riskProfile) => {
    setSelectedRiskProfile(riskProfile);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this risk profile?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/risk_profilings/${id}`
        );
        toast.success("Risk profile deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting risk profile:", error);
        toast.error("An error occurred while deleting the risk profile.");
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
              Risk Type
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Severity
            </th>
            <th scope="col" className="px-6 py-3">
              Impact
            </th>
            <th scope="col" className="px-6 py-3">
              Remedial Steps
            </th>
            <th scope="col" className="px-6 py-3">
              Status
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
          {riskProfiles.map((riskProfile) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={riskProfile.id}
            >
              <td className="px-6 py-4">{riskProfile.risk_type}</td>
              <td className="px-6 py-4">{riskProfile.description}</td>
              <td className="px-6 py-4">{riskProfile.severity}</td>
              <td className="px-6 py-4">{riskProfile.impact}</td>
              <td className="px-6 py-4">{riskProfile.remedial_steps}</td>
              <td className="px-6 py-4">{riskProfile.status}</td>
              <td className="px-6 py-4">{riskProfile.closure_date}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(riskProfile)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(riskProfile.id)}
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
      {selectedRiskProfile && (
        <EditRiskProfile
          riskProfile={selectedRiskProfile}
          setFetch={setFetch}
          closeModal={() => setSelectedRiskProfile(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Risk Profile
        </button>
      )}
      {addModalOpen && (
        <AddRiskProfile
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default RiskProfiling;
