import styles from "./style.module.css";
import HeaderLogo from "../../components/HeaderLogo";
import LoginForm from "../../components/LoginForm";
import image from "../../assets/images/home.jpg";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 0 }, // Départ : invisible et légèrement bas
  animate: { opacity: 1, y: 0 }, // Arrivée : visible et position normale
  exit: { opacity: 0, y: 0 }, // Sortie : invisible et remonte légèrement
};

function Home() {
  return (
    <motion.div
      key=""
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className={styles.home}>
        <div className={styles.leftPane}>
          <HeaderLogo />
          <LoginForm />
        </div>
        <div
          className={styles.rightPane}
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <p className={`body-small ${styles.info}`}>
            Analysez vos performances en un clin d’œil, suivez vos progrès et
            atteignez vos objectifs.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
