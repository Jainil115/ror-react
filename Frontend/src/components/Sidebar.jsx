import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaListAlt,
  FaUserTie,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import ProjectModal from "./ProjectModal";
import { UserContext } from "../contexts/UserContext";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [activeLink, setActiveLink] = useState("");

  const { myUser } = useContext(UserContext);

  if (!myUser) {
    return <div>Loading...</div>;
  }

  const isAdminOrProjectManager =
    myUser && (myUser.role === "admin" || myUser.role === "auditor");

  const openModal = () => {
    setIsModalOpen(true);
    setStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    setStep(step + 1);
  };

  return (
    <>
      <div className="bg-gray-200 text-gray-800 py-4 px-2 h-screen w-1/6">
        <div className="flex flex-col justify-between h-full px-6">
          <div>
            {isAdminOrProjectManager && (
              <button
                onClick={openModal}
                className="block py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center mb-4"
              >
                <FaPlus className="mr-2" /> New Project
              </button>
            )}
            <Link
              to="/projects"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Projects" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Projects")}
            >
              <FaListAlt className="mr-2" /> Projects
            </Link>

            <a
              href="#"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Project Manager" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Project Manager")}
            >
              <FaUserTie className="mr-2" /> Project Manager
            </a>
            <a
              href="#"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Employees" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Employees")}
            >
              <FaTachometerAlt className="mr-2" /> Employees
            </a>
            {myUser.role === "admin" && ( // Check if user role is admin
              <Link
                to="/users"
                className={`block py-2 flex items-center hover:text-gray-600 ${
                  activeLink === "AddUser" ? "text-blue-500" : ""
                }`}
                onClick={() => setActiveLink("AddUser")}
              >
                <FaUserPlus className="mr-2" />  Users
              </Link>
            )}
            <a
              href="#"
              className={`block py-2 flex items-center hover:text-gray-600 ${
                activeLink === "Settings" ? "text-blue-500" : ""
              }`}
              onClick={() => setActiveLink("Settings")}
            >
              <FaCog className="mr-2" /> Settings
            </a>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProjectModal
          step={step}
          closeModal={closeModal}
          handleContinue={handleContinue}
        />
      )}
    </>
  );
};

export default Sidebar;
