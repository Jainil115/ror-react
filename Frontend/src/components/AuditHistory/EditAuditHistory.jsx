import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditAuditHistory({ audit, setFetch, closeModal }) {
  const [date, setDate] = useState(audit.date);
  const [reviewedBy, setReviewedBy] = useState(audit.reviewed_by);
  const [status, setStatus] = useState(audit.status);
  const [reviewedSection, setReviewedSection] = useState(
    audit.reviewed_section
  );
  const [queries, setQueries] = useState(audit.queries);
  const [actionItem, setActionItem] = useState(audit.action_item);

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAudit = {
      date,
      reviewed_by: reviewedBy,
      status,
      reviewed_section: reviewedSection,
      queries,
      action_item: actionItem,
    };

    try {
      await axios.put(
        `/api/v1/projects/${id}/audit_histories/${audit.id}`,
        updatedAudit
      );
      toast.success("Audit history updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating audit history:", error);
      toast.error("An error occurred while updating the audit history.");
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
        <h2 className="text-lg font-semibold mb-4">Edit Audit History</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Reviewed By:</label>
            <input
              type="text"
              value={reviewedBy}
              onChange={(e) => setReviewedBy(e.target.value)}
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
            <label>Reviewed Section:</label>
            <input
              type="text"
              value={reviewedSection}
              onChange={(e) => setReviewedSection(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Queries:</label>
            <input
              type="text"
              value={queries}
              onChange={(e) => setQueries(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Action Item:</label>
            <input
              type="text"
              value={actionItem}
              onChange={(e) => setActionItem(e.target.value)}
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

export default EditAuditHistory;
