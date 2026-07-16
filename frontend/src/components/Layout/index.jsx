import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./style.module.css";

function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <main className={styles.outlet}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
