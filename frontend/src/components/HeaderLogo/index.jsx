import styles from "./style.module.css";
import Logo from "../Logo";
import logo from "../../assets/images/SPORTSEE.svg";

function HeaderLogo() {
  return (
    <div className={styles.headerLogo}>
      <Logo size="large" />
      <img src={logo} alt="Logo SPORTSEE" />
    </div>
  );
}

export default HeaderLogo;
