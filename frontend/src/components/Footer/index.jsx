import styles from "./style.module.css";
import Logo from "../Logo";

/**
 * Composant footer utilisé uniquement dasn les pages où l'utilisateur
 * est authentifié (intégré au Layout)
 *
 * @example
 * <Footer />
 */
function Footer() {
  return (
    <div className={styles.footer}>
      <ul className={styles.footerLeft}>
        <li className={styles.list}>©Sportsee</li>
        <li className={styles.list}>Tous droits réservés</li>
      </ul>
      <ul className={styles.footerRight}>
        <li className={styles.list}>Conditions générales</li>
        <li className={`${styles.space} ${styles.list}`}>Contact</li>
        <li className={styles.list}>
          <Logo size="small" />
        </li>
      </ul>
    </div>
  );
}

export default Footer;
