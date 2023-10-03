import { Route, Routes } from "react-router-dom";
import Logs from "../pages/logs-screen/Logs";
import ProjectsList from "../pages/projects/ProjectsList";
import LogDetails from "../pages/logs-screen/LogDetails";

const AuthenticatedRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/logs" element={<Logs />} />
        <Route path="/projectslist" element={<ProjectsList />} />
        <Route path="/logdetails/:id" element={<LogDetails />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedRoutes;
