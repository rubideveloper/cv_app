import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageCVs from "./pages/ManageCVs";
import UserCV from "./pages/UserCV";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-cv" element={<UserCV />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-cvs" element={<ManageCVs />} />
      </Routes>
    </Router>
  );
}

export default App;
