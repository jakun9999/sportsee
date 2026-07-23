import { USER_DATA, USER_ACTIVITY } from "./mockData";
import axios from "axios";

// Turn modeMock to true to use Mock data instead of API
const modeMock = false;

export const getUserProfile = async () => {
  if (modeMock) {
    const user = USER_DATA[0];
    console.log(user);
    if (!user) throw new Error("Impossible de charger les données du profil");
    return user;
  }

  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  try {
    const response = await axios.get("/api/user-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    // Si l'erreur est liée au token (ex: 401 expiré), on redirige
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    throw error;
  }
};

export const getUserActivity = async (startDate, endDate) => {
  if (modeMock) {
    const sessions = USER_ACTIVITY;
    console.log(sessions);
    if (!sessions)
      throw new Error(
        "Impossible de charger les données d'activité de l'utilisateur",
      );
    return sessions;
  }
  const token = sessionStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return null;
  }

  try {
    const response = await axios.get(
      `/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'activité :", error);
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    throw error;
  }
};
