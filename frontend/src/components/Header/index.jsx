import styles from "./style.module.css";
import HeaderLogo from "../HeaderLogo";
import Nav from "../Nav";

function Header() {
  return (
    <div className={`body-default ${styles.main}`}>
      <HeaderLogo />
      <Nav />
    </div>
  );
}

export default Header;
