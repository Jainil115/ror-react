import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAuditHistory from "./EditAuditHistory";
import AddAuditHistory from "./AddAuditHistory";
import { UserContext } from "../../contexts/UserContext";

function AuditHistory({ project, setFetch }) {
  const [auditHistories, setAuditHistories] = useState([]);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { myUser } = useContext(UserContext);

  useEffect(() => {
    const fetchAuditHistories = async () => {
      try {
        const response = await axios.get(
          `/api/v1/projects/${project.id}/audit_histories`
        );
        setAuditHistories(response.data);
      } catch (error) {
        toast.error("Error fetching audit histories");
        console.error("Error fetching audit histories:", error);
      }
    };

    fetchAuditHistories();

    // Set interval to fetch audit histories every minute
    const intervalId = setInterval(fetchAuditHistories, 6000);

    // Cleanup function
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [project, setFetch]);

  const handleEdit = (audit) => {
    setSelectedAudit(audit);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete this audit history?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `/api/v1/projects/${project.id}/audit_histories/${id}`
        );
        toast.success("Audit history deleted successfully.");
        setFetch((prevFetch) => !prevFetch);
      } catch (error) {
        console.error("Error deleting audit history:", error);
        toast.error("An error occurred while deleting the audit history.");
      }
    }
  };

  const isAdminOrAuditor =
    myUser && (myUser.role === "admin" || myUser.role === "auditor");

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Reviewed By
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Reviewed Section
            </th>
            <th scope="col" className="px-6 py-3">
              Queries
            </th>
            <th scope="col" className="px-6 py-3">
              Action Item
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {auditHistories.map((audit) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={audit.id}>
              <td className="px-6 py-4">{audit.date}</td>
              <td className="px-6 py-4">{audit.reviewed_by}</td>
              <td className="px-6 py-4">{audit.status}</td>
              <td className="px-6 py-4">{audit.reviewed_section}</td>
              <td className="px-6 py-4">{audit.queries}</td>
              <td className="px-6 py-4">{audit.action_item}</td>
              <td className="px-6 py-4 text-right flex gap-2">
                {isAdminOrAuditor && (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(audit)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(audit.id)}
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
      {selectedAudit && (
        <EditAuditHistory
          audit={selectedAudit}
          setFetch={setFetch}
          closeModal={() => setSelectedAudit(null)}
        />
      )}

      {/* Add Modal */}
      {isAdminOrAuditor && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          onClick={() => setAddModalOpen(true)}
        >
          Add Audit
        </button>
      )}
      {addModalOpen && (
        <AddAuditHistory
          project={project}
          setFetch={setFetch}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default AuditHistory;
