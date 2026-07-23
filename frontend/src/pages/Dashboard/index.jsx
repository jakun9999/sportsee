import styles from "./style.module.css";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";
import LongProfile from "../../components/LongProfile";
import WeekDistanceGraph from "../../components/WeekDistanceGraph";
import WeekBpmGraph from "../../components/WeekBpmGraph";
import WeekActivity from "../../components/WeekActivity";
import { getWeekRange } from "../../utils/date";
import {
  getCurrentWeekDistance,
  getCurrentWeekActiveTime,
} from "../../utils/stats";
import { motion } from "framer-motion";
import { useData } from "../../contexts/DataContext";

const pageVariants = {
  initial: { opacity: 0, y: 0 }, // Départ : invisible et légèrement bas
  animate: { opacity: 1, y: 0 }, // Arrivée : visible et position normale
  exit: { opacity: 0, y: 0 }, // Sortie : invisible et remonte légèrement
};

function Dashboard() {
  const { profile, statistics, activities, isLoading, error } = useData();
  if (error) return <Navigate to="/error" state={{ errorCode: 500 }} />;

  const isReady = !isLoading && profile && statistics && activities;

  // Current week (from monday to sunday)
  const weekDate = getWeekRange();

  // format option for dates
  const formatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return (
    <motion.div
      key="dashboard"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {!isReady ? (
        <p>Chargement de vos données en cours...</p>
      ) : (
        <div className={styles.dashboard}>
          <LongProfile />
          <div className={styles.sectionLastPerf}>
            <h2 className={`heading-4`}>Vos dernières performances</h2>
            <div className={styles.perfGraphContainer}>
              <WeekDistanceGraph />
              <WeekBpmGraph />
            </div>
          </div>
          <div className={styles.sectionWeekPerf}>
            <h2 className={`heading-4`}>Cette semaine</h2>
            <p className={`body-large ${styles.weekDate}`}>
              Du {weekDate.start.toLocaleDateString("fr-FR", formatOptions)} au{" "}
              {weekDate.end.toLocaleDateString("fr-FR", formatOptions)}
            </p>
            <div className={styles.weeklyGraphContainer}>
              <WeekActivity />
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
      )}
    </motion.div>
  );
}

export default Dashboard;
