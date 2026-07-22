import styles from "./style.module.css";
import { formatToShortDate } from "../../utils/date";
import { useData } from "../../contexts/DataContext";

function ShortProfile() {
  // Formating profile creation date to local format day number month year
  // for example jeudi 1 juin 2025

  const { profile } = useData();
  const formatedDate = formatToShortDate(profile.createdAt);

  return (
    <div className={styles.shortProfile}>
      <div className={styles.sectionLeft}>
        <div className="profile-photo-container">
          <img
            src={profile.profilePicture}
            alt={`Photo de ${profile.firstName} ${profile.lastName}`}
          />
        </div>

        <div className={styles.subSection}>
          <h1 className={`heading-4 ${styles.name}`}>
            {profile.firstName} {profile.lastName}
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
