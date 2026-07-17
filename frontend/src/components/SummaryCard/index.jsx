import styles from "./style.module.css";

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
