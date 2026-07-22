import styles from "./style.module.css";
import success from "../../assets/images/success.svg";
import { formatToLongDate } from "../../utils/date";
import { getTotalDistance } from "../../utils/stats";
import { useData } from "../../contexts/DataContext";

function LongProfile() {
  // Formating profile creation date to local format day number month year
  // for example jeudi 1 juin 2025

  const { profile, activities, isLoading } = useData();

  // Si les données sont en cours de chargement ou absentes
  if (isLoading || !profile || !activities) {
    return <div className={styles.longProfile}>Chargement du profil...</div>;
  }

  const formatedDate = formatToLongDate(profile.createdAt);

  return (
    <div className={styles.longProfile}>
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
      <div className={styles.sectionRight}>
        <p className={`body-default ${styles.grayedText}`}>
          Distance totale parcourue
        </p>
        <div className={`heading-4 ${styles.card}`}>
          <img src={success} className={styles.success} alt="" />
          <span>{getTotalDistance(activities)} km</span>
        </div>
      </div>
    </div>
  );
}

export default LongProfile;
