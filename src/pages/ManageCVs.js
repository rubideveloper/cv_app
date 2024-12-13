import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Importer Navbar
import { createCV, updateCV, deleteCV, fetchAllCVs } from "../services/api";

const AdminCVForm = () => {
  // CV, CV-liste, redigeringsstatus, lastingstatus og CV ID
  const [cv, setCv] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    skills: "",
    education: "",
    experience: "",
    references: "",
  });
  const [cvList, setCvList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  // CV'er blir henta ved innlasting av komponenten og sjekker om brukeren er logga inn
  useEffect(() => {
    const currentUserId = localStorage.getItem("userId"); // Hent userId fra localStorage

    if (!currentUserId) {
      alert("Brukeren er ikke logget inn.");
      navigate("/login"); // Naviger til login-siden hvis ikke brukern er logga inn
      return;
    }

    const fetchAllUserCVs = async () => {
      setLoading(true);
      try {
        const cvs = await fetchAllCVs(); // Hent alle CV'er
        setCvList(cvs);
      } catch (error) {
        alert("Feil ved henting av CV'er.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUserCVs(); // Hent alle CV'er
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newCv = {
        ...cv,
      };

      if (isEditing) {
        await updateCV(id, newCv); // Bruk ID for å oppdatere CV
        alert("CV oppdatert!");
      } else {
        await createCV(newCv); // Opprett ny CV
        alert("CV opprettet!");
        setCvList([...cvList, newCv]); // Legg til det nye CV'en i lista
      }

      setCv({
        personalInfo: { name: "", email: "", phone: "" },
        skills: "",
        education: "",
        experience: "",
        references: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Feil ved oppretting eller oppdatering av CV:", error);
      alert("Feil ved oppretting eller oppdatering av CV.");
    }
  };

  const handleDelete = async (cvId) => {
    try {
      await deleteCV(cvId); // Slett CV basert på ID
      alert("CV slettet!");
      setCvList(cvList.filter((item) => item._id !== cvId)); // Fjern CV fra lista etter sletting
    } catch (error) {
      alert("Feil ved sletting av CV.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCv({ ...cv, personalInfo: { ...cv.personalInfo, [name]: value } });
  };

  const handleEdit = (cvItem) => {
    setCv({
      personalInfo: {
        name: cvItem.personalInfo.name,
        email: cvItem.personalInfo.email,
        phone: cvItem.personalInfo.phone,
      },
      skills: cvItem.skills,
      education: cvItem.education,
      experience: cvItem.experience,
      references: cvItem.references,
    });
    setIsEditing(true);
    setId(cvItem._id); // Sett ID for redigering
  };

  return (
    <div className="p-6">
      <Navbar />
      <div className="p-8 bg-gradient-to-r from-[#90E0EF] to-[#CAF0F8] min-h-screen">
        <h1 className="mb-20 text-3xl font-bold text-[#023E8A] text-center">
          {isEditing ? "Rediger CV" : "Opprett CV"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-md p-10 mx-auto bg-white rounded-lg shadow-lg"
        >
          <h2 className="mb-4 text-xl text-[#023E8A] text-center">
            {isEditing ? "Oppdater CV" : "Opprett ny CV"}
          </h2>
          <label className="block mb-2">Navn:</label>
          <input
            type="text"
            name="name"
            value={cv.personalInfo.name}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          <label className="block mb-2">E-post:</label>
          <input
            type="email"
            name="email"
            value={cv.personalInfo.email}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          <label className="block mb-2">Telefonnummer:</label>
          <input
            type="tel"
            name="phone"
            value={cv.personalInfo.phone}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          value={cv.references}
          <label className="block mb-2">Ferdigheter:</label>
          <input
            type="text"
            name="skills"
            value={cv.skills}
            onChange={(e) => setCv({ ...cv, skills: e.target.value })}
            className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          <label className="block mb-2">Utdanning:</label>
          <input
            type="text"
            name="education"
            value={cv.education}
            onChange={(e) => setCv({ ...cv, education: e.target.value })}
            className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          <label className="block mb-2">Erfaring:</label>
          <input
            type="text"
            name="experience"
            value={cv.experience}
            onChange={(e) => setCv({ ...cv, experience: e.target.value })}
            className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          <label className="block mb-2">Referanser:</label>
          <input
            type="text"
            name="references"
            onChange={(e) => setCv({ ...cv, references: e.target.value })}
            className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
          <button
            type="submit"
            className="mt-8 w-full p-3 text-white bg-[#0077B6] rounded-lg hover:bg-[#023E8A] focus:ring-4 focus:ring-[#90E0EF]"
          >
            {isEditing ? "Oppdater CV" : "Opprett CV"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => handleDelete(id)}
              className="mt-4 w-full p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-[#90E0EF]"
            >
              Slett CV
            </button>
          )}
        </form>

        <h2 className="mt-16 mb-4 text-xl text-[#023E8A]">Alle CV-er:</h2>
        <ul className="space-y-4">
          {cvList.map((cvItem, index) => (
            <li
              key={cvItem._id || index} // Bruk ID for hver CV
              className="p-4 bg-white border rounded-lg shadow-lg"
            >
              <p>
                <strong>Navn:</strong> {cvItem.personalInfo.name}
              </p>
              <p>
                <strong>E-post:</strong> {cvItem.personalInfo.email}
              </p>
              <p>
                <strong>Telefonnummer:</strong> {cvItem.personalInfo.phone}
              </p>
              <button
                onClick={() => handleEdit(cvItem)}
                className="mt-2 w-full p-2 text-white bg-[#023E8A] rounded-lg hover:bg-[#0077B6]"
              >
                Rediger
              </button>
              <button
                onClick={() => handleDelete(cvItem._id)}
                className="w-full p-2 mt-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Slett
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCVForm;
