import React from "react";
import { Route, Routes } from "react-router-dom";
import Issues from "../pages/issues/Issues";
import Projects from "../pages/projects/Projects";
import Alerts from "../pages/alerts/Alerts";
import Dashboards from "../pages/dashboards/Dashboards";
import Discover from "../pages/discover/Discover";
import Performance from "../pages/performance/Performance";
import Releases from "../pages/releases/Releases";
import Replays from "../pages/replays/Replays";
import Settings from "../pages/settings/Settings";
import Stats from "../pages/stats/Stats";
import UserFeedBack from "../pages/userfeedback/UserFeedBack";

const AuthenticatedRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="/replays" element={<Replays />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/userfeedback" element={<UserFeedBack />} />
      </Routes>
    </div>
  );
};

export default AuthenticatedRoutes;
