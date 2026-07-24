import React, { createContext, useState, useEffect, useContext } from "react";
import { useFetchUser } from "../hooks/useFetchUser";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [activities, setActivities] = useState(null);

  const { data, isLoading, error } = useFetchUser();

  // Mise à jour automatique des états dès que `data` est disponible
  useEffect(() => {
    if (data) {
      setProfile(data.userProfile?.profile ?? null);
      setStatistics(data.userProfile?.statistics ?? null);
      setActivities(data.userActivity ?? null);
    }
  }, [data]);

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
