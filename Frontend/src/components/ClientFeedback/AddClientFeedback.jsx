import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function AddClientFeedback({ project, setFetch, closeModal }) {
  const [feedbackType, setFeedbackType] = useState("");
  const [dateReceived, setDateReceived] = useState("");
  const [detailedFeedback, setDetailedFeedback] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [closureDate, setClosureDate] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClientFeedback = {
      feedback_type: feedbackType,
      date_received: dateReceived,
      detailed_feedback: detailedFeedback,
      action_taken: actionTaken,
      closure_date: closureDate,
      project_id: id,
    };

    try {
      await axios.post(
        `/api/v1/projects/${id}/client_feedbacks`,
        newClientFeedback
      );
      toast.success("Client feedback added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding client feedback:", error);
      toast.error("An error occurred while adding the client feedback.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Client Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Feedback Type:</label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
              required
            >
              <option value="">Select Feedback Type</option>
              <option value="Complaint">Complaint</option>
              <option value="Appreciation">Appreciation</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Date Received:</label>
            <input
              type="date"
              required
              value={dateReceived}
              onChange={(e) => setDateReceived(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Detailed Feedback:</label>
            <input
              type="text"
              value={detailedFeedback}
              required
              onChange={(e) => setDetailedFeedback(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Action Taken:</label>
            <input
              type="text"
              value={actionTaken}
              required
              onChange={(e) => setActionTaken(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Closure Date:</label>
            <input
              type="date"
              value={closureDate}
              required
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
      </div>cd 
    </div>
  );
}

export default AddClientFeedback;
