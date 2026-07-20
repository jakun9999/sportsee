import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

function Nav() {
  const { logout, userId } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. On vide le state global dans le Context
    logout();

    // 2. On redirige immédiatement vers la page de connexion / accueil
    // AnimatePresence va s'occuper de la transition fluide !
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
