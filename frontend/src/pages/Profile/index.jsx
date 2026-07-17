import styles from "./style.module.css";
import { Navigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";
import Header from "../../components/Header";
import ShortProfile from "../../components/ShortProfile";
import SummaryCard from "../../components/SummaryCard";
import { formatToShortDate } from "../../utils/date";
import {
  getTotalRunningTime,
  getTotalCaloriesBurned,
  getTotalDays,
  getTotalDistance,
} from "../../utils/stats";

function Profile() {
  const { data, isLoading, error } = useFetchUser();
  if (isLoading) return <p>Chargement</p>;
  if (error) return <Navigate to="/error" />;

  const profile = data.userProfile.profile;
  const statistics = data.userProfile.statistics;
  const activities = data.userActivity;
  const distance = getTotalDistance(data.userActivity);
  const date = formatToShortDate(profile.createdAt);
  const duration = getTotalRunningTime(data.userActivity);
  const days = getTotalDays(data.userActivity, profile.createdAt);
  const calories = getTotalCaloriesBurned(data.userActivity);

  return (
    <div className={styles.profile}>
      <div className={styles.leftPane}>
        <ShortProfile
          firstName={profile.firstName}
          lastName={profile.lastName}
          distance={statistics.totalDistance}
          photo={profile.profilePicture}
          createdAt={profile.createdAt}
        />
        <div className={styles.profileDetails}>
          <h2
            className={`heading-4 ${styles.textBlack} ${styles.profileTitle}`}
          >
            Votre profil
          </h2>
          <div className={`body-large ${styles.details}`}>
            <p>Âge : {profile.age}</p>
            <p>Genre : {profile.genre === "male" ? "Homme" : "Femme"}</p>
            <p>
              Taille :{" "}
              {`${Math.trunc(profile.height / 100)}m${profile.height % 100}`}
            </p>
            <p>Poids : {profile.weight}kg</p>
          </div>
        </div>
      </div>
      <div className={styles.statsTitle}>
        <h2 className={`heading-4 ${styles.textBlack}`}>Vos statistiques</h2>
        <p className={`body-default ${styles.textGrayStrong}`}>
          depuis le {date}
        </p>
        <div className={styles.stats}>
          <SummaryCard
            title="Temps total couru"
            total={duration.hours}
            unit={duration.minutes}
          />
          <SummaryCard title="Calories brûlées" total={calories} unit="cal" />
          <SummaryCard
            title="Distance totale parcourue"
            total={distance}
            unit="km"
          />
          <SummaryCard
            title="Nombre de jours de repos"
            total={days.rest}
            unit={days.rest > 1 ? "jours" : "jour"}
          />
          <SummaryCard
            title="Nombre de sessions"
            total={days.sessions}
            unit={days.sessions > 1 ? "sessions" : "session"}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
