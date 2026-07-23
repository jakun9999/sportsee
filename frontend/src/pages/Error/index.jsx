import styles from "./style.module.css";
import { useLocation } from "react-router-dom";
import HeaderLogo from "../../components/HeaderLogo";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 0 }, // Départ : invisible et légèrement bas
  animate: { opacity: 1, y: 0 }, // Arrivée : visible et position normale
  exit: { opacity: 0, y: 0 }, // Sortie : invisible et remonte légèrement
};

function Error() {
  const location = useLocation();
  const errorCode = location.state?.errorCode || 500;
  let errorMessage = "";

  switch (errorCode) {
    case 404:
      errorMessage = "Page introuvable !";
      break;
    case 500:
      errorMessage = "Erreur du serveur !";
    default:
      errorMessage = "Une erreur est survenue";
  }

  return (
    <motion.div
      key="error"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className={styles.error}>
        <div className={styles.logo}>
          <HeaderLogo />
        </div>
        <div className={styles.errorPosition}>
          <div className={styles.errorDisplay}>
            <h1 className="heading-1">Code erreur : {errorCode}</h1>
            <h2>{errorMessage}</h2>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Error;
