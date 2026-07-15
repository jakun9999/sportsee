import styles from "./style.module.css";
import image from "../../assets/images/Logo.png";

function Logo() {
  return (
    <div>
      <img src={image} alt="Logo Sportsee" className={styles.logo} />
    </div>
  );
}

export default Logo;
