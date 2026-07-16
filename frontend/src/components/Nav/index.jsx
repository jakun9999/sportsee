import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

function Nav() {
  return (
    <div className={styles.menu}>
      <NavLink to="/dashboard" className={styles.navLink}>
        Dashboard
      </NavLink>
      <NavLink to="/profile" className={styles.navLink}>
        Mon profil
      </NavLink>
      <span className={styles.separator}>|</span>
      <NavLink to="/disconnect" className={styles.navDisconnect}>
        Se déconnecter
      </NavLink>
    </div>
  );
}

export default Nav;
