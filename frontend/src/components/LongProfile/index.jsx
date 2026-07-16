import styles from "./style.module.css";
import success from "../../assets/images/success.svg";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function LongProfile({ photo, firstName, lastName, createdAt, distance }) {
  // Formating profile creation date to local format day number month year
  // for example jeudi 1 juin 2025

  const formatedDate = dateFormatter.format(new Date(`${createdAt}T00:00:00`));

  return (
    <div className={styles.longProfile}>
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
      <div className={styles.sectionRight}>
        <p className={`body-default ${styles.grayedText}`}>
          Distance totale parcourue
        </p>
        <div className={`heading-4 ${styles.card}`}>
          <img src={success} className={styles.success} alt="" />
          <span>{distance} km</span>
        </div>
      </div>
    </div>
  );
}

export default LongProfile;
