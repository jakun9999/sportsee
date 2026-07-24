import styles from "./style.module.css";
import Logo from "../Logo";
import logo from "../../assets/images/SPORTSEE.svg";

/**
 * Composant HeaderLogo affichant le logo animé et le nom
 * sportsee. Utilisé dans la page Home seul et dans le composant
 * Header pour les pages authentifiées.
 * @example
 * <Header />
 */
function HeaderLogo() {
  return (
    <div className={styles.headerLogo}>
      <Logo size="large" />
      <img src={logo} alt="Logo SPORTSEE" />
    </div>
  );
}

export default HeaderLogo;
