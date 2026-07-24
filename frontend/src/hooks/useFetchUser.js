import { useState, useEffect } from "react";
import { getUserProfile, getUserActivity } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export function useFetchUser() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si le token n'est pas encore disponible, on attend !
    if (!token) {
      setIsLoading(true);
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Le token est bien présent, on lance les requêtes en parallèle
        const [profile, activity] = await Promise.all([
          getUserProfile(token), // On passe le token ici
          getUserActivity(
            token,
            "2000-01-01",
            new Date().toISOString().split("T")[0],
          ),
        ]);

        setData({
          userProfile: profile,
          userActivity: activity,
        });
        setError(null);
      } catch (err) {
        console.error("Erreur détaillée Axios:", err.response || err);
        setError(err.message || "Erreur lors de la récupération des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]); // Important : React relancera l'effet dès que `token` sera disponible !

  return { data, isLoading, error };
}
