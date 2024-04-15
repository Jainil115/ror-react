import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function AddProjectUpdate({ project, setFetch, closeModal }) {
  const [date, setDate] = useState("");
  const [generalUpdates, setGeneralUpdates] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProjectUpdate = {
      date,
      general_updates: generalUpdates,
      project_id: id,
    };

    try {
      await axios.post(
        `/api/v1/projects/${id}/project_updates`,
        newProjectUpdate
      );
      toast.success("Project update added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding project update:", error);
      toast.error("An error occurred while adding the project update.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Project Update</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Date:</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>General Updates:</label>
            <textarea
              rows="4"
              value={generalUpdates}
              required
              onChange={(e) => setGeneralUpdates(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2 w-full"
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

export default AddProjectUpdate;
