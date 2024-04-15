import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddAuditHistory({ project, setFetch, closeModal }) {
  const [date, setDate] = useState("");
  const [reviewedBy, setReviewedBy] = useState("");
  const [status, setStatus] = useState("");
  const [reviewedSection, setReviewedSection] = useState("");
  const [queries, setQueries] = useState("");
  const [actionItem, setActionItem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAudit = {
      date,
      reviewed_by: reviewedBy,
      status,
      reviewed_section: reviewedSection,
      queries,
      action_item: actionItem,
      project_id: project.id,
    };

    try {
      await axios.post(
        `/api/v1/projects/${project.id}/audit_histories`,
        newAudit
      );
      toast.success("Audit history added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding audit history:", error);
      toast.error("An error occurred while adding the audit history.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Audit History</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Reviewed By:</label>
            <input
              type="text"
              value={reviewedBy}
              required
              onChange={(e) => setReviewedBy(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Status:</label>
            <input
              type="text"
              value={status}
              required
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Reviewed Section:</label>
            <input
              type="text"
              value={reviewedSection}
              required
              onChange={(e) => setReviewedSection(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Queries:</label>
            <input
              type="text"
              value={queries}
              required
              onChange={(e) => setQueries(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Action Item:</label>
            <input
              type="text"
              value={actionItem}
              required
              onChange={(e) => setActionItem(e.target.value)}
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

export default AddAuditHistory;
