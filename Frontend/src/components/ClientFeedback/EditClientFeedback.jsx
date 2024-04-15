import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditClientFeedback({ clientFeedback, setFetch, closeModal }) {
  const [feedbackType, setFeedbackType] = useState(
    clientFeedback.feedback_type
  );
  const [dateReceived, setDateReceived] = useState(
    clientFeedback.date_received
  );
  const [detailedFeedback, setDetailedFeedback] = useState(
    clientFeedback.detailed_feedback
  );
  const [actionTaken, setActionTaken] = useState(clientFeedback.action_taken);
  const [closureDate, setClosureDate] = useState(clientFeedback.closure_date);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedClientFeedback = {
      feedback_type: feedbackType,
      date_received: dateReceived,
      detailed_feedback: detailedFeedback,
      action_taken: actionTaken,
      closure_date: closureDate,
    };

    try {
      await axios.put(
        `/api/v1/projects/${id}/client_feedbacks/${clientFeedback.id}`,
        updatedClientFeedback
      );
      toast.success("Client feedback updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating client feedback:", error);
      toast.error("An error occurred while updating the client feedback.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
        >
          {/* <svg
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
          </svg> */}
        </button>
        <h2 className="text-lg font-semibold mb-4">Edit Client Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Feedback Type:</label>
            <input
              type="text"
              required
              value={feedbackType}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (
                  inputValue === "Complaint" ||
                  inputValue === "Appreciation"
                ) {
                  setFeedbackType(inputValue);
                }
              }}
              className="border rounded-md px-2 py-1 ml-2"
            />
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
              required
              value={detailedFeedback}
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

export default EditClientFeedback;
