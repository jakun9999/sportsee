import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./style.module.css";

function Layout() {
  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.layout}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
