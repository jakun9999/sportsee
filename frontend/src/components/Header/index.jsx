import styles from "./style.module.css";
import HeaderLogo from "../HeaderLogo";
import Nav from "../Nav";

/**
 * Composant Header utilisé uniquement dans les pages où l'utilisateur
 * est authentifié (intégré au Layout)
 *
 * @example
 * <Header />
 */
function Header() {
  return (
    <div className={`body-default ${styles.header}`}>
      <HeaderLogo />
      <Nav />
    </div>
  );
}

export default Header;
