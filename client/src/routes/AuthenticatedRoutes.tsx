import React from "react";
import { Route, Routes } from "react-router-dom";

import Projects from "../pages/projects/Projects";
import Logs from "../pages/logs/Logs";
import ProjectsList from "../pages/projects/ProjectsList";

const AuthenticatedRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/logs" element={<Logs />} />
        <Route path="/projectslist" element={<ProjectsList />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedRoutes;
