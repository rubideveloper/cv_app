import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../components/LogoutBtn";

function Dashboard() {
  // Henter navn og rolle fra bruker fra localStorage
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // Navigere mellom sider
  const navigate = useNavigate();

  const logout = () => {
    // Det her fjerner brukerens data fra localStorage
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#90E0EF] to-[#CAF0F8]">
      <div className="p-10 text-center bg-white rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-[#023E8A] mb-14">
          Velkommen, {name}!
        </h1>

        {role === "admin" ? (
          <div className="space-y-4">
            <button
              onClick={() => navigate("/manage-users")}
              className="w-full p-3 text-white bg-[#0077B6] rounded-lg hover:bg-[#023E8A] focus:ring-4 focus:ring-[#90E0EF]"
            >
              Administrer brukere
            </button>
            <button
              onClick={() => navigate("/manage-cvs")}
              className="w-full p-3 text-white bg-[#90E0EF] rounded-lg hover:bg-[#0077B6] focus:ring-4 focus:ring-[#CAF0F8]"
            >
              Administrer CV-er
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/my-cv")}
            className="w-full p-3 text-white bg-[#0077B6] rounded-lg hover:bg-[#023E8A] focus:ring-4 focus:ring-[#90E0EF]"
          >
            Administrer min CV
          </button>
        )}

        <div className="mt-16">
          <LogoutBtn logout={logout} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
