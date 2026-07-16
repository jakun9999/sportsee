import styles from "./style.module.css";
import HeaderLogo from "../HeaderLogo";
import Nav from "../Nav";

function Header() {
  return (
    <div className={`body-default ${styles.header}`}>
      <HeaderLogo />
      <Nav />
    </div>
  );
}

export default Header;
