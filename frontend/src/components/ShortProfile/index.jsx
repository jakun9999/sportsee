import styles from "./style.module.css";
import { formatToShortDate } from "../../utils/date";
import { useData } from "../../contexts/DataContext";

/**
 * Composant ShortProfile pour afficher un profil sans
 * détail et prenant moins de place.
 *
 * @example
 * <ShortProfile />
 */
function ShortProfile() {
  const { profile, isLoading } = useData();

  // Si les données sont en cours de chargement ou absentes
  if (isLoading || !profile) {
    return (
      <div className={styles.shortProfile}>
        Chargement du profil en cours...
      </div>
    );
  }

  // Formatage de la date de création du compte
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
