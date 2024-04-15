import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectModal = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectScope, setProjectScope] = useState("");
  const [projectStack, setProjectStack] = useState("");
  const [project_manager, setProject_manager] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  const handleContinue = () => {
    if (step === 1) {
      if (validateProjectDetails()) {
        handleProjctDetails();
        setStep(step + 1);
      }
    } else {
      if (validateClientDetails()) {
        handleClient();
      }
    }
  };

  const validateProjectDetails = () => {
    if (
      !projectName ||
      !projectDesc ||
      !projectScope ||
      !projectStack ||
      !project_manager
    ) {
      toast.error("Please fill in all project details");
      return false;
    }
    return true;
  };

  const validateClientDetails = () => {
    if (!clientName || !clientEmail) {
      toast.error("Please fill in all client details");
      return false;
    }
    return true;
  };

  const handleProjctDetails = async () => {
    // Post request for project details
    try {
      const projectResponse = await axios.post("/api/v1/projects", {
        project_name: projectName,
        project_desc: projectDesc,
        project_scope: projectScope,
        project_stack: projectStack,
        project_status: "In progress",
        project_manager: project_manager,
      });

      // Post request for client details
      toast.success("Project created successfully");
      console.log("Project created:", projectResponse.data);
    } catch (error) {
      toast.error("Error creating project");
      console.error("Error:", error);
    }
  };

  const handleClient = async () => {
    // Post request for client details
    try {
      const clientResponse = await axios.post("/api/v1/clients", {
        name: clientName,
        email: clientEmail,
      });

      console.log("Client created:", clientResponse.data);
      toast.success("Client created successfully");
      closeModal(); // Close modal after successful creation
    } catch (error) {
      toast.error("Error creating client");
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="bg-white rounded-lg p-10 w-96 ">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
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
        <div className="modal-content">
          <div className="mb-4">
            <div className="relative h-2 bg-gray-300 rounded-full">
              <div
                className={`absolute top-0 h-2 bg-blue-500 rounded-full ${
                  step === 2 ? "w-full" : "w-1/2"
                }`}
              ></div>
            </div>
          </div>
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-black">
                Project Details
              </h2>
              <input
                type="text"
                placeholder="Project Name"
                className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                required
              ></textarea>
              <input
                type="text"
                placeholder="Project Scope"
                className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                required
              />
              <select
                required
                className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={projectStack}
                onChange={(e) => setProjectStack(e.target.value)}
              >
                <option value="">Select Project Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="mobile">Mobile App</option>
                <option value="database">Database</option>
              </select>

              <select
                className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
                value={project_manager}
                onChange={(e) => setProject_manager(e.target.value)}
                cd
              >
                <option value="">Select Project Manager</option>
                <option value="Dipa Majumdar">Dipa Majumdar</option>
                <option value="Firoja Parveen">Firoja Parveen</option>
              </select>

              <button
                onClick={handleContinue}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-black">
                Client Details
              </h2>
              <input
                type="text"
                required
                placeholder="Client Name"
                className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="border border-gray-300 px-3 py-2 mb-4 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
              <button
                onClick={handleContinue}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Finish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
