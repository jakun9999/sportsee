import styles from "./style.module.css";

const LOGO_DATA = [
  {
    id: 1,
    marginTop: 3.33,
    totalHeight: 15.63,
    topHeight: 11,
    bottomHeight: 8,
    delay: 0,
  },
  {
    id: 2,
    marginTop: 0,
    totalHeight: 20.66,
    topHeight: 14,
    bottomHeight: 15,
    delay: 0.1,
  },
  {
    id: 3,
    marginTop: 2,
    totalHeight: 14.33,
    topHeight: 12,
    bottomHeight: 5,
    delay: 0.15,
  },
  {
    id: 4,
    marginTop: 5,
    totalHeight: 15,
    topHeight: 9,
    bottomHeight: 9,
    delay: 0.2,
  },
  {
    id: 5,
    marginTop: 0,
    totalHeight: 17.33,
    topHeight: 14,
    bottomHeight: 6,
    delay: 0,
  },
];

function Logo({ size = "large" }) {
  // Scaling the logo dimension (large for header logo, small for footer logo)
  const scale = size === "small" ? 0.9 : 1;

  return (
    <ul
      className={styles.logo}
      style={{
        height: `${23.41 * scale}px`,
        gap: `${1 * scale}px`,
      }}
    >
      {LOGO_DATA.map((col) => {
        // Adapting size based on scaling
        const currentTotalHeight = col.totalHeight * scale;
        const currentTopHeight = col.topHeight * scale;
        const currentBottomHeight = col.bottomHeight * scale;
        const currentMarginTop = col.marginTop * scale;

        // Calculate slice based on scaled values
        const currentTopPositionForBottomHeight =
          currentTotalHeight - currentBottomHeight;
        const currentSliceDistance = currentTotalHeight - currentTopHeight;

        // Calculate translate max / min based on scale
        const bottomTranslation = 1 * scale;
        const topTranslation = -0.5 * scale;

        return (
          <li
            key={col.id}
            className={styles.col}
            v
            style={{
              width: `${3 * scale}px`,
              height: `${currentTotalHeight}px`,
              marginTop: `${currentMarginTop}px`,
            }}
          >
            {/* Red part */}
            <div
              className={styles.colTop}
              style={{
                height: `${currentTopHeight}px`,
                animationDelay: `${col.delay}s`,
                "--slide-distance": `${currentSliceDistance}px`,
                "--top-translate": `${topTranslation}px`,
                "--bottom-translate": `${bottomTranslation}px`,
              }}
            />
            {/* Blue part */}
            <div
              className={styles.colBottom}
              style={{
                height: `${currentBottomHeight}px`,
                top: `${currentTopPositionForBottomHeight}px`,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default Logo;
