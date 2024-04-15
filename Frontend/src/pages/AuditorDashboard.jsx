import React, { useContext, useState } from "react";
import {
  Tab,
  TabList,
  TabPanels,
  TabsContext,
  TabPanel,
} from "monday-ui-react-core";
import DisplayProjects from "../components/DisplayProjects";
import { UserContext } from "../contexts/UserContext";
import InProgressProjects from "../components/InProgressProjects";
import CompletedProjects from "../components/CompletedProjects";
import OnHoldProjects from "../components/OnHoldProjects";

// AuditorDashboard component
function AuditorDashboard() {
  const [fetch, setFetch] = useState(false);
  const { myUser } = useContext(UserContext);

  if (!myUser) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full">
      {!myUser ? (
        <div>Loading...</div>
      ) : myUser.role === "admin" ? (
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      ) : myUser.role === "projectmanager" ? (
        <h2 className="text-2xl font-bold">Project Manager Dashboard</h2>
      ) : myUser.role === "client" ? (
        <h2 className="text-2xl font-bold">Client Dashboard</h2>
      ) : (
        <h2 className="text-2xl font-bold">Auditor Dashboard</h2>
      )}

      <TabsContext>
        <TabList>
          <Tab>All Projects</Tab>
          <Tab>In progress</Tab>
          <Tab>Completed</Tab>
          <Tab>Hold</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Display ptoject component  */}
            <DisplayProjects fetch={fetch} setFetch={setFetch} />
          </TabPanel>

          <TabPanel>
            {/* In progress projects component  */}
            <InProgressProjects fetch={fetch} setFetch={setFetch} />
          </TabPanel>

          <TabPanel>
            {/* Completed projects component  */}
            <CompletedProjects fetch={fetch} setFetch={setFetch} />
          </TabPanel>
          <TabPanel>
            {/* On hold projects component  */}
            <OnHoldProjects fetch={fetch} setFetch={setFetch} />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </div>
  );
}

export default AuditorDashboard;
