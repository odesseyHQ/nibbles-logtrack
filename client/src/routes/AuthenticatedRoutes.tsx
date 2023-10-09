import { Route, Routes } from "react-router-dom";
import Logs from "../pages/logs-screen/Logs";
import ProjectsList from "../pages/projects/ProjectsList";
import LogDetails from "../pages/logs-screen/LogDetails";

const AuthenticatedRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/logs" element={<Logs />} />
        <Route path="/" element={<ProjectsList />} />
        <Route path="/logdetails/:id" element={<LogDetails />} />
        <Route path="/projectlogs/:id" element={<Logs />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedRoutes;
