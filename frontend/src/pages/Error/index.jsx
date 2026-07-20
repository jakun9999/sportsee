import styles from "./style.module.css";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 0 }, // Départ : invisible et légèrement bas
  animate: { opacity: 1, y: 0 }, // Arrivée : visible et position normale
  exit: { opacity: 0, y: 0 }, // Sortie : invisible et remonte légèrement
};

function Error() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div>
        <h1 className="heading-1">404</h1>
        <h2>Oups 🙈 Cette page n'existe pas</h2>
        <p>La page que vous cherchez semble introuvable.</p>
      </div>
    </motion.div>
  );
}

export default Error;
