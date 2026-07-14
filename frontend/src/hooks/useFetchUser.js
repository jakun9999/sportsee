import { useState, useEffect } from "react";
import { getUserProfile, getUserActivity } from "../services/api";

export const useFetchUser = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // On lance les appels en parallèle sans passer d'ID
        const [profile, activity] = await Promise.all([
          getUserProfile(),
          getUserActivity(),
        ]);

        setData({
          userProfile: profile,
          userActivity: activity,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Tableau de dépendances vide = s'exécute uniquement au montage du composant

  return { data, isLoading, error };
};
