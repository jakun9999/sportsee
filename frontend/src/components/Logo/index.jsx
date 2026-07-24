import styles from "./style.module.css";

/**
 * Array avec les dimensions de chaque barre
 * verticale du logo animé.
 * Un léger délai est ajouté pour l'animation
 * en décalé pour chaque barre
 */

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

/**
 * Logo animé sportsee utilisable avec 2 tailles.
 * Une pour le header (en grand) et une pour le footer
 * en petit. Le scaling est fait via le paramètre size
 * qui peut être large ou small.
 *
 * @example
 * <Logo size="large" />
 */
function Logo({ size = "large" }) {
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
        // Adaptation des dimensions pour le scaling.
        const currentTotalHeight = col.totalHeight * scale;
        const currentTopHeight = col.topHeight * scale;
        const currentBottomHeight = col.bottomHeight * scale;
        const currentMarginTop = col.marginTop * scale;

        // Calcul du slice par rapport au scaling
        const currentTopPositionForBottomHeight =
          currentTotalHeight - currentBottomHeight;
        const currentSliceDistance = currentTotalHeight - currentTopHeight;

        // Calcul des translations pour les animations en fonction
        // du scaling.
        const bottomTranslation = 1 * scale;
        const topTranslation = -0.5 * scale;

        return (
          <li
            key={col.id}
            className={styles.col}
            style={{
              width: `${3 * scale}px`,
              height: `${currentTotalHeight}px`,
              marginTop: `${currentMarginTop}px`,
            }}
          >
            {/* Partie rouge de la barre */}
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
            {/* Partie bleu de la barre */}
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
