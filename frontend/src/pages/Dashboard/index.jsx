import styles from "./style.module.css";
import { Navigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";
import Header from "../../components/Header";
import LongProfile from "../../components/LongProfile";

function Dashboard() {
  const { data, isLoading, error } = useFetchUser();
  if (isLoading) return <p>Chargement</p>;
  if (error) return <Navigate to="/error" />;

  const profile = data.userProfile.profile;
  const statistics = data.userProfile.statistics;
  return (
    <div className={styles.main}>
      <LongProfile
        firstName={profile.firstName}
        lastName={profile.lastName}
        distance={statistics.totalDistance}
        photo={profile.profilePicture}
        createdAt={profile.createdAt}
      />
    </div>
  );
}

export default Dashboard;
