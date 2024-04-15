import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function AddRiskProfiling({ project, setFetch, closeModal }) {
  const [riskType, setRiskType] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [impact, setImpact] = useState("");
  const [remedialSteps, setRemedialSteps] = useState("");
  const [status, setStatus] = useState("");
  const [closureDate, setClosureDate] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRiskProfiling = {
      risk_type: riskType,
      description,
      severity,
      impact,
      remedial_steps: remedialSteps,
      status,
      closure_date: closureDate,
      project_id: id,
    };

    try {
      await axios.post(
        `/api/v1/projects/${id}/risk_profilings`,
        newRiskProfiling
      );
      toast.success("Risk profiling added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding risk profiling:", error);
      toast.error("An error occurred while adding the risk profiling.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Risk Profiling</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Risk Type:</label>
            <input
              type="text"
              required
              value={riskType}
              onChange={(e) => setRiskType(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Description:</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Severity:</label>
            <input
              type="text"
              required
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Impact:</label>
            <input
              type="text"
              required
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
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
              required
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

export default AddRiskProfiling;
