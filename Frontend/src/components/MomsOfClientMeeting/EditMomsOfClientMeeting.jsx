import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function EditMomsOfClientMeeting({ mom, setFetch, closeModal }) {
  const [date, setDate] = useState(mom.date);
  const [duration, setDuration] = useState(mom.duration);
  const [momLink, setMomLink] = useState(mom.mom_link);
  const [comments, setComments] = useState(mom.comments);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMom = {
      date,
      duration,
      mom_link: momLink,
      comments,
    };

    try {
      await axios.put(
        `/api/v1/projects/${id}/moms_of_client_meetings/${mom.id}`,
        updatedMom
      );
      toast.success("Mom of client meeting updated successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error updating mom of client meeting:", error);
      toast.error(
        "An error occurred while updating the mom of client meeting."
      );
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
        <h2 className="text-lg font-semibold mb-4">
          Edit Mom of Client Meeting
        </h2>
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
            <label>Duration:</label>
            <input
              type="number"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded-md px-2 py-1 ml-2"
            />
          </div>
          <div className="mb-4">
            <label>Mom Link:</label>
            <input
              type="text"
              value={momLink}
              onChange={(e) => setMomLink(e.target.value)}
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

export default EditMomsOfClientMeeting;
