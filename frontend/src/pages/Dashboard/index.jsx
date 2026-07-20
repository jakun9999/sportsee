import styles from "./style.module.css";
import { Navigate } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";
import Header from "../../components/Header";
import LongProfile from "../../components/LongProfile";
import WeekDistanceGraph from "../../components/WeekDistanceGraph";
import WeekBpmGraph from "../../components/WeekBpmGraph";
import WeekActivity from "../../components/WeekActivity";
import { getWeekRange } from "../../utils/date";
import {
  getCurrentWeekDistance,
  getCurrentWeekActiveTime,
  getTotalDistance,
  getCurrentWeekActivities,
} from "../../utils/stats";
import { act } from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 0 }, // Départ : invisible et légèrement bas
  animate: { opacity: 1, y: 0 }, // Arrivée : visible et position normale
  exit: { opacity: 0, y: 0 }, // Sortie : invisible et remonte légèrement
};

function Dashboard() {
  const { data, isLoading, error } = useFetchUser();
  if (isLoading) return <p>Chargement</p>;
  if (error) return <Navigate to="/error" />;

  const profile = data.userProfile.profile;
  const statistics = data.userProfile.statistics;
  const activities = data.userActivity;
  const weekDate = getWeekRange();
  const formatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className={styles.dashboard}>
        <LongProfile
          firstName={profile.firstName}
          lastName={profile.lastName}
          distance={getTotalDistance(activities)}
          photo={profile.profilePicture}
          createdAt={profile.createdAt}
        />
        <div className={styles.sectionLastPerf}>
          <h2 className={`heading-4`}>Vos dernières performances</h2>
          <div className={styles.perfGraphContainer}>
            <WeekDistanceGraph activities={activities} />
            <WeekBpmGraph activities={activities} />
          </div>
        </div>
        <div className={styles.sectionWeekPerf}>
          <h2 className={`heading-4`}>Cette semaine</h2>
          <p className={`body-large ${styles.weekDate}`}>
            Du {weekDate.start.toLocaleDateString("fr-FR", formatOptions)} au{" "}
            {weekDate.end.toLocaleDateString("fr-FR", formatOptions)}
          </p>
          <div className={styles.weeklyGraphContainer}>
            <WeekActivity
              goal={profile.weeklyGoal}
              activities={getCurrentWeekActivities(activities)}
            />
            <div className={styles.summaryContainer}>
              <div className={styles.time}>
                <p className={`body-default ${styles.label}`}>
                  Durée d'activité
                </p>
                <p>
                  <span className={`heading-4 ${styles.dataBlueStrong}`}>
                    {`${getCurrentWeekActiveTime(activities)} `}
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
                    {`${getCurrentWeekDistance(activities)} `}
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
    </motion.div>
  );
}

export default Dashboard;
