import styles from "./style.module.css";

/**
 * Cartes pour l'affichage des données globales de l'utilisateur
 * sur l'ensemble de ses sessions.
 * @param {*} param0
 * @example
 * <SummaryCard title="titre de la carte" total=256 unit="km" />
 */
function SummaryCard({ title = "", total = "", unit = "" }) {
  return (
    <div className={styles.summaryCard}>
      <p className="body-default">{title}</p>
      <p className="heading-4">
        {total} <span className={`body-large ${styles.unit}`}>{unit}</span>
      </p>
    </div>
  );
}

export default SummaryCard;
