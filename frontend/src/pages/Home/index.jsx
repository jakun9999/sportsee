import styles from "./style.module.css";
import HeaderLogo from "../../components/HeaderLogo";
import LoginForm from "../../components/LoginForm";
import image from "../../assets/images/home.jpg";

function Home() {
  return (
    <div className={styles.main}>
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
  );
}

export default Home;
