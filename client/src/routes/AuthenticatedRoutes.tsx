import React from "react";
import { Route, Routes } from "react-router-dom";

import Projects from "../pages/projects/Projects";

const AuthenticatedRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedRoutes;
