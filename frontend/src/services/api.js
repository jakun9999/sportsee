// import { USER_DATA, USER_ACTIVITY } from "./mockData";
import axios from "axios";

export const getUserProfile = async (token) => {
  // const user = USER_DATA[0];
  // if (!user) throw new Error("Impossible de charger les données du profil");
  // return user;
  const response = await axios.get("/api/user-info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  return response.data;
};

export const getUserActivity = async (token, startDate, endDate) => {
  //   const sessions = USER_ACTIVITY;
  //   if (!sessions)
  //     throw new Error(
  //       "Impossible de charger les données d'activité de l'utilisateur",
  //     );
  //   return sessions;
  const response = await axios.get(
    `/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(response);

  return response.data;
};
