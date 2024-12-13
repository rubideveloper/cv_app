const API_BASE = process.env.REACT_APP_API_BASE; //Api_base ligger i .env fil

//Hent alle brukere
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) {
      throw new Error("Feil ved henting av brukere");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Registrer ny bruker
export const createUser = async (newUser) => {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (!response.ok) {
      throw new Error("Feil ved oppretting av bruker");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Oppdater bruker
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    console.log("Responsstatus:", response.status);

    // Håndter respons om den ikke har innhold
    if (response.status === 200 || response.status === 204) {
      const contentLength = response.headers.get("Content-Length");

      if (!contentLength || contentLength === "0") {
        console.log("Oppdatering vellykket, men ingen data returnert.");
        return updatedUser; // Returner brukeren direkte
      }

      const data = await response.json(); // Hvis innhold finnes
      return data;
    } else {
      throw new Error("Feil statuskode ved oppdatering");
    }
  } catch (error) {
    console.error("Feil ved oppdatering av bruker:", error);
    throw error;
  }
};

//Slett bruker
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Feil ved sletting av bruker");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hent alle CV'er
export const fetchAllCVs = async () => {
  try {
    const response = await fetch(`${API_BASE}/cvs`);
    if (!response.ok) {
      throw new Error("Feil ved henting av CV-er");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Hent alle CV'er på userId
export const fetchCVsByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/cvs?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Feil ved henting av CV-er");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Opprett CV
export const createCV = async (newCV) => {
  try {
    const response = await fetch(`${API_BASE}/cvs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCV),
    });
    if (!response.ok) {
      throw new Error("Feil ved oppretting av CV");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Rediger CV
export const updateCV = async (id, updatedCV) => {
  try {
    const response = await fetch(`${API_BASE}/cvs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCV),
    });

    if (response.status === 200 || response.status === 204) {
      const contentLength = response.headers.get("Content-Length");

      if (!contentLength || contentLength === "0") {
        console.log("Oppdatering vellykket, men ingen data returnert.");
        return updatedCV;
      }

      const data = await response.json();
      return data;
    } else {
      throw new Error("Feil statuskode ved oppdatering");
    }
  } catch (error) {
    console.error("Feil ved oppdatering av CV:", error);
    throw error;
  }
};

//Slett CV
export const deleteCV = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/cvs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Feil ved sletting av CV");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
