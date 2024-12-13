import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE;

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { username, password } = data;

    // Hent alle brukere fra CRUD CRUD API
    fetch(`${API_BASE}/users`)
      .then((response) => response.json())
      .then((users) => {
        // Finn en bruker som matcher både brukernavn og passord man taster inn i inputfeltene
        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          // Lagre brukerens rolle og brukernavn i localStorage
          localStorage.setItem("userId", user._id);
          localStorage.setItem("role", user.role);
          localStorage.setItem("name", user.name);
          navigate("/dashboard"); // Naviger til dashboardet om ikke ting matcher med hva man taster inn
        } else {
          alert("Feil brukernavn eller passord.");
        }
      })
      .catch((error) => {
        console.error("Feil ved henting av brukere:", error);
        alert(
          "Det oppstod en feil ved serverkommunikasjon. Vennligst prøv igjen senere."
        );
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#90E0EF] to-[#CAF0F8]">
      <form
        className="max-w-sm p-10 bg-white rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-6 text-3xl font-bold text-center text-[#023E8A]">
          Logg inn
        </h2>

        <label className="block mb-2 text-sm font-semibold text-[#023E8A]">
          Brukernavn
        </label>
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Skriv inn brukernavn"
          className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
        />

        <label className="block mb-2 text-sm font-semibold text-[#023E8A]">
          Passord
        </label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full p-3 mb-6 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
        />

        <button
          type="submit"
          className="w-full p-3 text-white bg-[#0077B6] rounded-lg hover:bg-[#023E8A] focus:ring-4 focus:ring-[#90E0EF]"
        >
          Logg inn
        </button>

        <div className="mt-4 text-center"></div>
      </form>
    </div>
  );
}

export default LoginPage;
