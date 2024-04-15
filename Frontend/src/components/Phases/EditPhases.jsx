import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditPhase({ phase, setFetch, closeModal }) {
  const [title, setTitle] = useState(phase.title);
  const [startDate, setStartDate] = useState(phase.start_date);
  const [completionDate, setCompletionDate] = useState(phase.completion_date);
  const [approvalDate, setApprovalDate] = useState(phase.approval_date);
  const [status, setStatus] = useState(phase.status);
  const [revisedCompletionDate, setRevisedCompletionDate] = useState(
    phase.revised_completion_date
  );
  const [comments, setComments] = useState(phase.comments);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPhase = {
      title,
      start_date: startDate,
      completion_date: completionDate,
      approval_date: approvalDate,
      status,
      revised_completion_date: revisedCompletionDate,
      comments,
    };

    try {
      await axios.put(
        `/api/v1/projects/${id}/phases/${phase.id}`,
        updatedPhase
      );
      toast.success("Phase updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating phase:", error);
      toast.error("An error occurred while updating the phase.");
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
        <h2 className="text-lg font-semibold mb-4">Edit Phase</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Title:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <label>Completion Date:</label>
            <input
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Approval Date:</label>
            <input
              type="date"
              value={approvalDate}
              onChange={(e) => setApprovalDate(e.target.value)}
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
            <label>Revised Completion Date:</label>
            <input
              type="date"
              value={revisedCompletionDate}
              onChange={(e) => setRevisedCompletionDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
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

export default EditPhase;
