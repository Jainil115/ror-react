import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function AddMomsOfClientMeeting({ project, setFetch, closeModal }) {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [momLink, setMomLink] = useState("");
  const [comments, setComments] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMom = {
      date,
      duration,
      mom_link: momLink,
      comments,
      project_id: id,
    };

    try {
      await axios.post(
        `/api/v1/projects/${id}/moms_of_client_meetings`,
        newMom
      );
      toast.success("Mom of client meeting added successfully.");
      setFetch((prev) => !prev);
      closeModal();
    } catch (error) {
      console.error("Error adding mom of client meeting:", error);
      toast.error("An error occurred while adding the mom of client meeting.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Add Mom of Client Meeting
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

export default AddMomsOfClientMeeting;
