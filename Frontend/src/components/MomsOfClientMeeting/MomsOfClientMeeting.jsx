import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditMomsOfClientMeeting from "./EditMomsOfClientMeeting";
import AddMomsOfClientMeeting from "./AddMomsOfClientMeeting";
import { UserContext } from "../../contexts/UserContext";

function MomsOfClientMeeting({ project, setFetch }) {
  const [moms, setMoms] = useState([]);
  const [selectedMom, setSelectedMom] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchMoms = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/moms_of_client_meetings`
        );
        setMoms(response.data);
      } catch (error) {
        console.error("Error fetching Moms of client meetings:", error);
      }
    };

    fetchMoms();

    const intervalId = setInterval(fetchMoms, 6000);

    return () => {
      clearInterval(intervalId);
    };
  }, [project, setFetch]);

  const handleEdit = (mom) => {
    setSelectedMom(mom);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this mom of client meeting?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/moms_of_client_meetings/${id}`
        );
        toast.success("Mom of client meeting deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting mom of client meeting:", error);
        toast.error(
          "An error occurred while deleting the mom of client meeting."
        );
      }
    }
  };

  const isAdminOrProjectManager =
    myUser && (myUser.role === "admin" || myUser.role === "projectmanager");

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Mom Link
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {moms.map((mom) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={mom.id}>
              <td className="px-6 py-4">{mom.date}</td>
              <td className="px-6 py-4">{mom.duration}</td>
              <td className="px-6 py-4">{mom.mom_link}</td>
              <td className="px-6 py-4">{mom.comments}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(mom)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(mom.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedMom && (
        <EditMomsOfClientMeeting
          mom={selectedMom}
          setFetch={setFetch}
          closeModal={() => setSelectedMom(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Mom of Client Meeting
        </button>
      )}
      {addModalOpen && (
        <AddMomsOfClientMeeting
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MomsOfClientMeeting;
