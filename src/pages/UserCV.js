import React from "react";
import CVForm from "../components/CVForm";
import { createCV } from "../services/api";
import Navbar from "../components/Navbar";

function UserCV() {
  const handleCVSubmit = (data) => {
    // Sender data til API'et for å opprette en CV
    createCV(data)
      .then((response) => {
        console.log("CV opprettet:", response);
      })
      .catch((error) => {
        console.error("Feil ved oppretting av CV:", error);
        alert("Kunne ikke opprette CV");
      });
  };

  return (
    <div className="p-6">
      <Navbar />

      <CVForm onSubmit={handleCVSubmit} />
    </div>
  );
}

export default UserCV;
