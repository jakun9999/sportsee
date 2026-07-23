import styles from "./style.module.css";
import HeaderLogo from "../../components/HeaderLogo";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 0 }, // Départ : invisible et légèrement bas
  animate: { opacity: 1, y: 0 }, // Arrivée : visible et position normale
  exit: { opacity: 0, y: 0 }, // Sortie : invisible et remonte légèrement
};

function Error() {
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
            <h1 className="heading-1">404</h1>
            <h2>Oups 🙈 Cette page n'existe pas</h2>
            <p>La page que vous cherchez semble introuvable.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Error;
