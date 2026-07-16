import styles from "./style.module.css";
import { Navigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";
import Header from "../../components/Header";
import LongProfile from "../../components/LongProfile";
import { getWeekRange } from "../../utils/date";

function Dashboard() {
  const { data, isLoading, error } = useFetchUser();
  if (isLoading) return <p>Chargement</p>;
  if (error) return <Navigate to="/error" />;

  const profile = data.userProfile.profile;
  const statistics = data.userProfile.statistics;
  const weekDate = getWeekRange();

  return (
    <div className={styles.dashboard}>
      <LongProfile
        firstName={profile.firstName}
        lastName={profile.lastName}
        distance={statistics.totalDistance}
        photo={profile.profilePicture}
        createdAt={profile.createdAt}
      />
      <div className={styles.sectionLastPerf}>
        <h2 className={`heading-4`}>Vos dernières performances</h2>
        <div className={styles.perfGraphContainer}>
          <div className={styles.lastKm}></div>
          <div className={styles.lastBpm}></div>
        </div>
      </div>
      <div className={styles.sectionWeekPerf}>
        <h2 className={`heading-4`}>Cette semaine</h2>
        <p className={`body-large ${styles.weekDate}`}>
          Du {weekDate.start} au {weekDate.end}
        </p>
        <div className={styles.weeklyGraphContainer}>
          <div className={styles.goals}></div>
          <div className={styles.summaryContainer}>
            <div className={styles.time}>
              <p className={`body-default ${styles.label}`}>Durée d'activité</p>
              <p>
                <span className={`heading-4 ${styles.dataBlueStrong}`}>
                  140{" "}
                </span>
                <span className={`body-large ${styles.dataBlueLight}`}>
                  minutes
                </span>
              </p>
            </div>
            <div className={styles.distance}>
              <p className={`body-default ${styles.label}`}>Distance</p>
              <p>
                <span className={`heading-4 ${styles.dataRedStrong}`}>
                  21.7{" "}
                </span>
                <span className={`body-large ${styles.dataRedLight}`}>
                  kilomètres
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
