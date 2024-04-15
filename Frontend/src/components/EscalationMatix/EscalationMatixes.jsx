import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EscalationMatrix = ({ projectId }) => {
  const [operationalEscalations, setOperationalEscalations] = useState([]);
  const [financialEscalations, setFinancialEscalations] = useState([]);
  const [technicalEscalations, setTechnicalEscalations] = useState([]);

  useEffect(() => {
    const fetchEscalations = async () => {
      try {
        const operationalResponse = await axios.get(
          `/api/v1/projects/${projectId}/operational_escalations`
        );
        const financialResponse = await axios.get(
          `/api/v1/projects/${projectId}/financial_escalations`
        );
        const technicalResponse = await axios.get(
          `/api/v1/projects/${projectId}/technical_escalations`
        );

        setOperationalEscalations(operationalResponse.data);
        setFinancialEscalations(financialResponse.data);
        setTechnicalEscalations(technicalResponse.data);
      } catch (error) {
        toast.error("Error fetching escalation data");
        console.error("Error fetching escalation data:", error);
      }
    };

    fetchEscalations();

    // const intervalId = setInterval(fetchEscalations, 120000); // Refresh every minute
    // return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [projectId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-8">Escalation Matrix</h2>

      <div className="grid grid-cols-3 gap-8">
        {/* Operational Escalations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Operational Escalations
          </h3>
          <div className="overflow-auto max-h-80">
            <table className="table-auto w-full text-sm">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Escalation Level</th>
                  <th className="px-4 py-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {operationalEscalations.map((escalation) => (
                  <tr key={escalation.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{escalation.escalation_level}</td>
                    <td className="px-4 py-2">{escalation.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Escalations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Financial Escalations</h3>
          <div className="overflow-auto max-h-80">
            <table className="table-auto w-full text-sm">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Escalation Level</th>
                  <th className="px-4 py-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {financialEscalations.map((escalation) => (
                  <tr key={escalation.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{escalation.escalation_level}</td>
                    <td className="px-4 py-2">{escalation.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Escalations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Technical Escalations</h3>
          <div className="overflow-auto max-h-80">
            <table className="table-auto w-full text-sm">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Escalation Level</th>
                  <th className="px-4 py-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {technicalEscalations.map((escalation) => (
                  <tr key={escalation.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{escalation.escalation_level}</td>
                    <td className="px-4 py-2">{escalation.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalationMatrix;
