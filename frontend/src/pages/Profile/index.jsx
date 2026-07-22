import styles from "./style.module.css";
import { Navigate } from "react-router-dom";
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
import { motion } from "framer-motion";
import { useData } from "../../contexts/DataContext";

const pageVariants = {
  initial: { opacity: 0, y: 0 }, // Départ : invisible et légèrement bas
  animate: { opacity: 1, y: 0 }, // Arrivée : visible et position normale
  exit: { opacity: 0, y: 0 }, // Sortie : invisible et remonte légèrement
};

function Profile() {
  const { profile, statistics, activities, isLoading, error } = useData();
  if (isLoading) return <p>Chargement</p>;
  if (error) return <Navigate to="/error" />;

  const distance = getTotalDistance(activities);
  const date = formatToShortDate(profile.createdAt);
  const duration = getTotalRunningTime(activities);
  const days = getTotalDays(profile.createdAt);
  const calories = getTotalCaloriesBurned(activities);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className={styles.profile}>
        <div className={styles.leftPane}>
          <ShortProfile />
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
    </motion.div>
  );
}

export default Profile;
