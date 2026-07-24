import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

/**
 * Menu de navigation pour les utilisateurs authentifiés
 * Utilisé dans le composant Header.
 *
 * @example
 * <Nav />
 */
function Nav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // On vide le state global dans le Context d'authentification
    logout();

    // On redirige immédiatement vers la page de connexion / accueil
    navigate("/");
  };
  return (
    <div className={styles.menu}>
      <NavLink to="/dashboard" className={styles.navLink}>
        Dashboard
      </NavLink>
      <NavLink to="/profile" className={styles.navLink}>
        Mon profil
      </NavLink>
      <span className={styles.separator}>|</span>
      <button onClick={handleLogout} className={styles.navDisconnect}>
        Se déconnecter
      </button>
    </div>
  );
}

export default Nav;
