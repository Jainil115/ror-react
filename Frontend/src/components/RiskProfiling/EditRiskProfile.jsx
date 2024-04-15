import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditRiskProfile({ riskProfile, setFetch, closeModal }) {
  const [riskType, setRiskType] = useState(riskProfile.risk_type);
  const [description, setDescription] = useState(riskProfile.description);
  const [severity, setSeverity] = useState(riskProfile.severity);
  const [impact, setImpact] = useState(riskProfile.impact);
  const [remedialSteps, setRemedialSteps] = useState(
    riskProfile.remedial_steps
  );
  const [status, setStatus] = useState(riskProfile.status);
  const [closureDate, setClosureDate] = useState(riskProfile.closure_date);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRiskProfile = {
      risk_type: riskType,
      description: description,
      severity: severity,
      impact: impact,
      remedial_steps: remedialSteps,
      status: status,
      closure_date: closureDate,
    };

    try {
      await axios.put(
        `/api/v1/projects/${id}/risk_profilings/${riskProfile.id}`,
        updatedRiskProfile
      );
      toast.success("Risk profile updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating risk profile:", error);
      toast.error("An error occurred while updating the risk profile.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">Edit Risk Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Risk Type:</label>
            <select
              value={riskType}
              onChange={(e) => setRiskType(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            >
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="technical">Technical</option>
              <option value="HT">HT</option>
              <option value="external">External</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Severity:</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Impact:</label>
            <select
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Remedial Steps:</label>
            <textarea
              value={remedialSteps}
              onChange={(e) => setRemedialSteps(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Status:</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Closure Date:</label>
            <input
              type="date"
              value={closureDate}
              onChange={(e) => setClosureDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Save
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

export default EditRiskProfile;
