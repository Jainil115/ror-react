import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();

    // Refresh data every minute
    const intervalId = setInterval(fetchData, 6000);

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Project name
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={project.id}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {project.project_name}
              </td>
              <td className="px-6 py-4 text-right flex gap-2">
                <Link to={`/projects/${project.id}`} className="text-blue-600">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
