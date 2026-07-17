import { USER_DATA, USER_ACTIVITY } from "./mockData";

export const getUserProfile = async () => {
  const user = USER_DATA[0];
  if (!user) throw new Error("Impossible de charger les données du profil");
  return user;
};

export const getUserActivity = async () => {
  const sessions = USER_ACTIVITY;
  if (!sessions)
    throw new Error(
      "Impossible de charger les données d'activité de l'utilisateur",
    );
  return sessions;
};
