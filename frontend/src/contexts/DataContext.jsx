import React, { createContext, useState, useEffect, useContext } from "react";
import { useFetchUser } from "../hooks/useFetchUser";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [activities, setActivities] = useState(null);

  // 1. Appel du Hook au bon endroit
  const { data, isLoading, error } = useFetchUser();

  // 2. Mise à jour automatique des états dès que `data` est disponible
  useEffect(() => {
    if (data) {
      setProfile(data.userProfile?.profile ?? null);
      setStatistics(data.userProfile?.statistics ?? null);
      setActivities(data.userActivity ?? null);
    }
  }, [data]); // Se déclenche automatiquement quand `data` change !

  return (
    <DataContext.Provider
      value={{
        profile,
        statistics,
        activities,
        isLoading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
