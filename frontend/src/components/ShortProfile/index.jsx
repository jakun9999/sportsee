import styles from "./style.module.css";
import { formatToShortDate } from "../../utils/date";

function ShortProfile({ photo, firstName, lastName, createdAt }) {
  // Formating profile creation date to local format day number month year
  // for example jeudi 1 juin 2025

  const formatedDate = formatToShortDate(createdAt);

  return (
    <div className={styles.shortProfile}>
      <div className={styles.sectionLeft}>
        <div className="profile-photo-container">
          <img src={photo} alt={`Photo de ${firstName} ${lastName}`} />
        </div>

        <div className={styles.subSection}>
          <h1 className={`heading-4 ${styles.name}`}>
            {firstName} {lastName}
          </h1>
          <p className={`body-default ${styles.grayedText}`}>
            Membre depuis le {formatedDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShortProfile;
