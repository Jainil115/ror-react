import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddApprovedTeam({ project, setFetch, closeModal }) {
  const [numberOfResources, setNumberOfResources] = useState("");
  const [role, setRole] = useState("");
  const [availabilityPercentage, setAvailabilityPercentage] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeamMember = {
      number_of_resources: numberOfResources,
      role,
      availability_percentage: availabilityPercentage,
      duration,
      project_id: project.id,
    };

    try {
      await axios.post(
        `/api/v1/projects/${project.id}/approved_teams`,
        newTeamMember
      );
      toast.success("Approved team member added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding approved team member:", error);
      toast.error("An error occurred while adding the approved team member.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Approved Team Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Number of Resources:</label>
            <input
              type="number"
              value={numberOfResources}
              required
              onChange={(e) => setNumberOfResources(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Role:</label>
            <input
              type="text"
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Availability Percentage:</label>
            <input
              type="number"
              value={availabilityPercentage}
              required
              onChange={(e) => setAvailabilityPercentage(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Duration:</label>
            <input
              type="text"
              value={duration}
              required
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Add
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddApprovedTeam;
