import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";

const AddProjectOverview = ({ project, setFetch }) => {
  const [overview, setOverview] = useState("");
  const [purpose, setPurpose] = useState("");
  const [goals, setGoals] = useState("");
  const [objectives, setObjectives] = useState("");
  const [budget, setBudget] = useState("");
  const { myUser } = useContext(UserContext);

  const isAdminOrProjectManager =
    myUser &&
    (myUser.role === "admin" ||
      myUser.role === "project_manager" ||
      myUser.role === "auditor");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure budget is not negative
    if (budget < 0) {
      console.error("Budget cannot be negative");
      return;
    }

    const data = {
      project_id: project.id,
      project_overview: overview,
      purpose,
      goals,
      objectives,
      budget,
    };

    try {
      console.log("Submitting data:", data);
      await axios.post(`/api/v1/projects/${project.id}/overviews`, data);
      console.log("Data submitted successfully");
      toast.success("Project Overview added successfully");
      setFetch((prevFetch) => !prevFetch);
      // Reset form fields
      setOverview("");
      setPurpose("");
      setGoals("");
      setObjectives("");
      setBudget("");
    } catch (error) {
      toast.error("Error submitting data");
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="overview" className="block mb-1 font-medium">
            Project Overview
          </label>
          <textarea
            id="overview"
            value={overview}
            required
            onChange={(e) => setOverview(e.target.value)}
            rows="4"
            placeholder="Enter project overview"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="purpose" className="block mb-1 font-medium">
            Purpose
          </label>
          <textarea
            id="purpose"
            value={purpose}
            required
            onChange={(e) => setPurpose(e.target.value)}
            rows="4"
            placeholder="Enter purpose"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="goals" className="block mb-1 font-medium">
            Goals
          </label>
          <textarea
            id="goals"
            value={goals}
            required
            onChange={(e) => setGoals(e.target.value)}
            rows="4"
            placeholder="Enter goals"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="objectives" className="block mb-1 font-medium">
            Objectives
          </label>
          <textarea
            id="objectives"
            value={objectives}
            required
            onChange={(e) => setObjectives(e.target.value)}
            rows="4"
            placeholder="Enter objectives"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block mb-1 font-medium">
            Budget (USD)
          </label>
          <input
            id="budget"
            type="number"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            min="0" // Ensure budget is not negative
            placeholder="Enter budget in USD"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {isAdminOrProjectManager && (
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProjectOverview;
