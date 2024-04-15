import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditApprovedTeam from "./EditApprovedTeam";
import AddApprovedTeam from "./AddApprovedTeam";
import { UserContext } from "../../contexts/UserContext";

function ApprovedTeam({ project, setFetch }) {
  const [approvedTeam, setApprovedTeam] = useState([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchApprovedTeam = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/approved_teams`
        );
        setApprovedTeam(response.data);
      } catch (error) {
        toast.error("Error fetching approved team members");
        console.error("Error fetching approved team members:", error);
      }
    };

    fetchApprovedTeam();

    // Set interval to fetch approved team members every minute
    const intervalId = setInterval(fetchApprovedTeam, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (teamMember) => {
    setSelectedTeamMember(teamMember);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this approved team member?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/approved_teams/${id}`
        );
        toast.success("Approved team member deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting approved team member:", error);
        toast.error(
          "An error occurred while deleting the approved team member."
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
              No of Resources
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Availability %
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {approvedTeam.map((teamMember) => (
            <tr
              className="bg-white border-b hover:bg-gray-50"
              key={teamMember.id}
            >
              <td className="px-6 py-4">{teamMember.number_of_resources}</td>
              <td className="px-6 py-4">{teamMember.role}</td>
              <td className="px-6 py-4">
                {teamMember.availability_percentage}
              </td>
              <td className="px-6 py-4">{teamMember.duration}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrProjectManager && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(teamMember)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(teamMember.id)}
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
      {selectedTeamMember && (
        <EditApprovedTeam
          teamMember={selectedTeamMember}
          setFetch={setFetch}
          closeModal={() => setSelectedTeamMember(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrProjectManager && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Team Member
        </button>
      )}
      {addModalOpen && (
        <AddApprovedTeam
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ApprovedTeam;
