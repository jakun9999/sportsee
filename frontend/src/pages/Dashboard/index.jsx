import styles from "./style.module.css";
import { Navigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

function Dashboard() {
  const { data, isLoading, error } = useFetchUser();
  if (isLoading) return <p>Chargement</p>;
  if (error) return <Navigate to="/error" />;

  return (
    <div>
      <h1>Bonjour {data.userProfile.profile.firstName}</h1>
    </div>
  );
}

export default Dashboard;
