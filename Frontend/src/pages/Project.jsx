import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";

import AddProjectOverview from "../components/AddProjectOverview";
import EditScopeStack from "../components/EditScopeStack";
import AuditHistory from "../components/AuditHistory/AuditHistory";
import VersionHistory from "../components/VersionHistory/VersionHistory";
import Stackholder from "../components/Stackholder/Stackholder";
import RiskProfiling from "../components/RiskProfiling/RiskProfiling";
import SprintDetails from "../components/SprintDetails/SprintDetails";
import Phases from "../components/Phases/Phases";
import EscalationMatrix from "../components/EscalationMatix/EscalationMatixes";
import { toast } from "react-toastify";
import ApprovedTeam from "../components/ApprovedTeam/ApprovedTeam";
import Resources from "../components/Resource/Resources";
import ClientFeedback from "../components/ClientFeedback/ClientFeedback";
import ProjectUpdates from "../components/ProjectUpdate/ProjectUpdates";
import MomsOfClientMeeting from "../components/MomsOfClientMeeting/MomsOfClientMeeting";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [fetch, setFetch] = useState(false);

  const tabs = [
    "Overview",
    "Scope & stack",
    "Escalation Matixes",
    "Audit History",
    "Version History",
    "Stakeholders",
    "Risk Profiling",
    "Phases",
    "Sprint detail",
    "Approved Team",
    "Resources",
    "Client Feedback",
    "Project Update",
    "MoMs of client meetings",
  ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/v1/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();

    // return () => {
    //   // Cleanup function
    // };
  }, [id]);

  const handleClick = () => {
    axios({
      url: "/pdf/generate_pdf",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        // Create a new blob object with the response data
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Create a URL for the blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const a = document.createElement("a");
        a.href = url;
        a.download = "project.pdf"; // Specify the file name
        a.click(); // Trigger the click event to start the download
        toast.success("PDF generated successfully");
      })
      .catch((error) => {
        // Handle error
        toast.error("Error generating PDF");
        console.error("There was an error:", error);
      });
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {project ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {project.project_name}
          </h2>
          {/* <br /> */}
          <div className="flex justify-end mr-4">
            <button
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate PDF
            </button>
          </div>

          {/* <hr /> */}

          <TabsContext>
            {/* <div className="overflow-x-auto flex w-500 whitespace-nowrap"> */}
            <TabList className="overflow-x-auto flex whitespace-nowrap">
              <Tab>Overview</Tab>
              <Tab>Scope & stack</Tab>
              <Tab>Escalation Matixes</Tab>
              <Tab>Audit History</Tab>
              <Tab>Versoin History</Tab>
              <Tab>Stakeholders</Tab>
              <Tab>Risk Profiling</Tab>
              <Tab>Phases</Tab>
              <Tab>Sprint detail</Tab>
              <Tab>Approved Team</Tab>
              <Tab>Resources</Tab>
              <Tab>Client Feedback</Tab>
              <Tab>Project Update</Tab>
              <Tab>MoMs of client meetings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {/* PROJECT OVERVIEW COMPONENT  */}

                <AddProjectOverview project={project} setFetch={setFetch} />
              </TabPanel>

              <TabPanel>
                {/* SCOPE AND STACK  */}
                <EditScopeStack project={project} setFetch={setFetch} />
              </TabPanel>

              <TabPanel>
                {/* ESCALATION MATRIXES */}

                <EscalationMatrix projectId={id} />
              </TabPanel>

              <TabPanel>
                {/* AUDIT HISTORY */}
                <AuditHistory project={project} setFetch={setFetch} />
              </TabPanel>

              <TabPanel>
                {/* VERSION HISTORY */}
                <VersionHistory project={project} setFetch={setFetch} />
              </TabPanel>

              <TabPanel>
                {/* STAKEHOLDERS */}
                <Stackholder project={project} setFetch={setFetch} />
              </TabPanel>

              <TabPanel>
                {/* RISK PROFILING */}
                <RiskProfiling project={project} setFetch={setFetch} />
              </TabPanel>

              <TabPanel>
                {/* PHASES */}
                <Phases project={project} setFetch={setFetch} />
              </TabPanel>

              <TabPanel>
                {/* SPRINT DETAIL */}
                <SprintDetails project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* APPROVED TEAM */}
                <ApprovedTeam project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* RESOURCES */}
                <Resources project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* CLIENT FEEDBACK */}
                <ClientFeedback project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* PROJECT UPDATE */}
                <ProjectUpdates project={project} setFetch={setFetch} />
              </TabPanel>
              <TabPanel>
                {/* MOMS OF CLIENT MEETINGS */}
                <MomsOfClientMeeting project={project} setFetch={setFetch} />
              </TabPanel>
            </TabPanels>
          </TabsContext>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
