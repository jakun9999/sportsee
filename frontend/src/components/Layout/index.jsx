import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./style.module.css";

/**
 * Layout à utilisé pour les pages qui doivent
 * intégrées le header et le footer. Le rendu du contenu
 * passe par un Outlet.
 *
 * @example
 * <Layout />
 */
function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.header}>
        <Header />
      </div>

      <main className={styles.outlet}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
