import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditProjectUpdate({ projectUpdate, setFetch, closeModal }) {
  const [date, setDate] = useState(projectUpdate.date);
  const [generalUpdates, setGeneralUpdates] = useState(projectUpdate.general_updates);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProjectUpdate = {
      date,
      general_updates: generalUpdates,
    };

    try {
      await axios.put(
        `/api/v1/projects/${id}/project_updates/${projectUpdate.id}`,
        updatedProjectUpdate
      );
      toast.success("Project update updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating project update:", error);
      toast.error("An error occurred while updating the project update.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Project Update</h2>
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
              onChange={(e) => setGeneralUpdates(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2 w-full"
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

export default EditProjectUpdate;
