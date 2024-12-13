import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCV,
  updateCV,
  deleteCV,
  fetchCVsByUserId,
} from "../services/api";

//CV (personlig informasjon, ferdigheter, utdanning, erfaring, referanser)
const CVForm = () => {
  const [cv, setCv] = useState({
    personalInfo: { name: "", email: "", phone: "" },
    skills: "",
    education: "",
    experience: "",
    references: "",
  });

  //liste av CV'er tilhørende brukeren
  const [cvList, setCvList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // For å kunne navigere til forskjellige ruter
  const navigate = useNavigate();

  //Loading...
  const [loading, setLoading] = useState(false);

  //For å lagre ID-en til CV som skal redigeres
  const [id, setId] = useState(null); // For edit purposes

  // Hente alle CV-er for innlogget bruker når komponenten blir lasta inn
  useEffect(() => {
    const currentUserId = localStorage.getItem("userId"); // Hent userId fra localStorage

    if (!currentUserId) {
      alert("Brukeren er ikke logget inn.");
      navigate("/login"); // Naviger til login-siden hvis ikke logga inn
      return;
    }

    // Hente alle CV'er til bruker
    const fetchUserCVs = async () => {
      setLoading(true);
      try {
        const cvs = await fetchCVsByUserId(currentUserId); // Hent alle CV'er
        const filteredCVs = cvs.filter((cv) => cv.userId === currentUserId); // Filtrer CV'er for brukeren
        setCvList(filteredCVs);
      } catch (error) {
        alert("Feil ved henting av CV-er.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserCVs(); // Hent CV'er for innlogga bruker
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUserId = localStorage.getItem("userId"); // Hent userId fra localStorage

    if (!currentUserId) {
      alert("Brukeren er ikke logget inn.");
      navigate("/login");
      return;
    }

    try {
      const newCv = {
        ...cv,
        userId: currentUserId,
      };

      if (isEditing) {
        await updateCV(id, newCv); // Bruk ID for å oppdatere
        alert("CV oppdatert!");
      } else {
        await createCV(newCv); // Opprett ny CV
        alert("CV opprettet!");
        setCvList([...cvList, newCv]); // Legg til den nye CV'en i lista
      }

      // Tilbakestill CV-skjemaet og sett redigering til false
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

  // Sletting av CV
  const handleDelete = async (cvId) => {
    try {
      await deleteCV(cvId); // Slett CV basert på ID
      alert("CV slettet!");
      setCvList(cvList.filter((item) => item._id !== cvId)); // Fjern CV fra listen etter sletting
      navigate("/cvs"); // Naviger til listen av CV'er
    } catch (error) {
      alert("Feil ved sletting av CV.");
    }
  };

  //Endring av inputfeltene for CV
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Oppdater kun den delen av CV'en som endres av personlig informasjon
    setCv({ ...cv, personalInfo: { ...cv.personalInfo, [name]: value } });
  };

  //Endring av eksisterende CV
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

      <h2 className="mt-16 mb-4 text-xl text-[#023E8A]">Din CV:</h2>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CVForm;
