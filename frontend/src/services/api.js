import axios from "axios";

export const getUserProfile = async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    sessionStorage.removeItem("token");
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
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
    throw error;
  }
};

export const getUserActivity = async (startDate, endDate) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    sessionStorage.removeItem("token");
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
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
    throw error;
  }
};
