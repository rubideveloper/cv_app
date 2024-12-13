import React, { useState, useEffect } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/api"; // Importer API-funksjonene
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [searchTerm, setSearchTerm] = useState(""); // For søket
  const [editingUser, setEditingUser] = useState(null); // For redigering

  // Hent alle brukere
  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error("Feil ved henting av brukere:", error));
  }, []);

  // Registrer ny bruker
  const addUser = (e) => {
    e.preventDefault();
    createUser(newUser)
      .then((data) => {
        setUsers([...users, data]);
        setNewUser({
          name: "",
          username: "",
          email: "",
          password: "",
          role: "user",
        });
      })
      .catch((error) => console.error("Feil ved oppretting av bruker:", error));
  };

  //Rediger bruker
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      username: user.username,
      email: user.email,
      password: "", // Kan være tom hvis du ikke vil at passord skal vises
      role: user.role,
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (editingUser && editingUser._id) {
      updateUser(editingUser._id, newUser)
        .then((data) => {
          console.log("Data fra server:", data); // Logg for debugging

          if (data) {
            // Oppdater brukerlisten umiddelbart med den oppdaterte dataen
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === editingUser._id ? { ...user, ...data } : user
              )
            );
            setEditingUser(null); // Tilbakestill redigeringsstatus
            setNewUser({
              // Nullstill formdata etter oppdatering
              name: "",
              username: "",
              email: "",
              password: "",
              role: "user",
            });
          } else {
            console.error("Ingen data mottatt fra serveren");
          }
        })
        .catch((error) =>
          console.error("Feil ved oppdatering av bruker:", error)
        );
    } else {
      console.error("Ingen gyldig bruker til oppdatering");
    }
  };

  // Slett bruker
  const removeUser = (id) => {
    deleteUser(id)
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((error) => console.error("Feil ved sletting av bruker:", error));
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user._id.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by ID as well
  );

  return (
    <div className="p-8 bg-gradient-to-r from-[#90E0EF] to-[#CAF0F8] min-h-screen">
      <Navbar />

      <h1 className="mb-20 flex items-center justify-center text-3xl font-bold text-[#023E8A]">
        Brukeradministrasjon
      </h1>

      <form
        onSubmit={editingUser ? handleUpdateUser : addUser} // Bruk handleUpdateUser for oppdatering av bruker
        className="max-w-sm p-10 mb-8 bg-white rounded-lg shadow-lg "
      >
        <h2 className="text-center mb-4 text-xl text-[#023E8A]">
          {editingUser ? "Rediger bruker" : "Registrer ny bruker"}
        </h2>

        <InputField
          type="text"
          placeholder="Navn"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />

        <InputField
          type="text"
          placeholder="Brukernavn"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />

        <InputField
          type="email"
          placeholder="E-post"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          q
          required
        />

        <InputField
          type="password"
          placeholder="Passord"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />

        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full p-3 mb-4 border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="mt-16 p-3 text-white bg-[#0077B6] rounded-lg hover:bg-[#023E8A] focus:ring-4 focus:ring-[#90E0EF]"
          >
            {editingUser ? "Oppdater bruker" : "Registrer bruker"}
          </button>
        </div>
      </form>

      <h2 className="mb-4 text-xl text-[#023E8A]">
        SØK ETTER EKSISTERENDE BRUKERE:
      </h2>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Søk etter bruker..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-full border-2 border-[#023E8A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
        />
      </div>

      <ul className="space-y-10 max-w-72">
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            className="p-6 transition-transform transform bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105"
          >
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">
                <strong className="text-[#023E8A]">Navn:</strong> {user.name}
              </p>

              <p className="text-lg font-medium text-gray-700">
                <strong className="text-[#023E8A]">Brukernavn:</strong>{" "}
                {user.username}
              </p>

              <p className="text-lg font-medium text-gray-700">
                <strong className="text-[#023E8A]">E-post:</strong> {user.email}
              </p>

              <p className="text-lg font-medium text-gray-700">
                <strong className="text-[#023E8A]">Passord:</strong>{" "}
                {user.password}
              </p>

              <p className="text-lg font-medium text-gray-700">
                <strong className="text-[#023E8A]">Rolle:</strong> {user.role}
              </p>
            </div>

            <button
              onClick={() => handleEditUser(user)}
              className="mt-4 px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-[#CAF0F8]"
              aria-label={`Rediger bruker ${user.name}`}
            >
              Rediger
            </button>

            <button
              onClick={() => removeUser(user._id)}
              className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-[#CAF0F8] focus:ring-opacity-50 transition-colors"
              aria-label={`Slett bruker ${user.name}`}
            >
              Slett
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
