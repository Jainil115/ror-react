import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function AddSprintDetail({ project, setFetch, closeModal }) {
  const [sprint, setSprint] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSprintDetail = {
      sprint,
      start_date: startDate,
      end_date: endDate,
      status,
      comments,
      project_id: id,
    };

    try {
      await axios.post(
        `/api/v1/projects/${id}/sprint_details`,
        newSprintDetail
      );
      toast.success("Sprint detail added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding sprint detail:", error);
      toast.error("An error occurred while adding the sprint detail.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Sprint Detail</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Sprint:</label>
            <input
              type="text"
              required
              value={sprint}
              onChange={(e) => setSprint(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Start Date:</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>End Date:</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
              required
            >
              <option value="">Select Status</option>
              <option value="Delayed">Delayed</option>
              <option value="On-time">On-time</option>
              <option value="Sign-off pending">Sign-off pending</option>
              <option value="Signed-off">Signed-off</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Comments:</label>
            <input
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
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

export default AddSprintDetail;
