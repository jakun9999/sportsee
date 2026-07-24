import styles from "./style.module.css";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useData } from "../../contexts/DataContext";

/**
 * Affichage des BPM de la semaine sélectionné sous forme
 * de graphique type Bar recharts. (min et max atteints par
 * jour du lundi au dimanche et moyenne).
 *
 * @example
 * <WeekBpmGraph />
 */
function WeekBpmGraph() {
  const { activities } = useData();
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

    const sunday = new Date(today);
    sunday.setDate(today.getDate() + daysUntilSunday);
    sunday.setHours(23, 59, 59, 999);
    return sunday;
  });

  const [isHovered, setIsHovered] = useState(false);

  const { currentPeriodActivities, periodLabel, totalAverageBpm } =
    useMemo(() => {
      // On calcule le lundi de départ
      const startOfPeriod = new Date(endDate);
      startOfPeriod.setDate(endDate.getDate() - 6);
      startOfPeriod.setHours(0, 0, 0, 0);

      // On extrait les timestamps numériques pour des comparaisons infaillibles
      const startTime = startOfPeriod.getTime();
      const endTime = endDate.getTime();

      const options = { day: "numeric", month: "short" };
      const label = `${startOfPeriod.toLocaleDateString("fr-FR", options)} - ${endDate.toLocaleDateString("fr-FR", options)}`;

      // Pour éviter les mutations en chaîne, on se base sur des offsets de jours purs
      const days = [
        { name: "Lun", minBpm: 0, maxBpm: 0, averageBpm: 0, offset: 0 },
        { name: "Mar", minBpm: 0, maxBpm: 0, averageBpm: 0, offset: 1 },
        { name: "Mer", minBpm: 0, maxBpm: 0, averageBpm: 0, offset: 2 },
        { name: "Jeu", minBpm: 0, maxBpm: 0, averageBpm: 0, offset: 3 },
        { name: "Ven", minBpm: 0, maxBpm: 0, averageBpm: 0, offset: 4 },
        { name: "Sam", minBpm: 0, maxBpm: 0, averageBpm: 0, offset: 5 },
        { name: "Dim", minBpm: 0, maxBpm: 0, averageBpm: 0, offset: 6 },
      ].map((d) => {
        // On crée une date fraîche pour chaque jour sans toucher à startOfPeriod
        const currentDay = new Date(startOfPeriod);
        currentDay.setDate(startOfPeriod.getDate() + d.offset);
        return {
          ...d,
          dayTimestamp: currentDay.setHours(0, 0, 0, 0),
        };
      });

      let totalBpm = [];

      const safeActivities = activities || [];
      safeActivities.forEach((activity) => {
        const activityTime = new Date(activity.date).setHours(0, 0, 0, 0);

        // Comparaison de nombre à nombre (timestamp)
        if (activityTime >= startTime && activityTime <= endTime) {
          if (activity.heartRate?.average) {
            totalBpm.push(activity.heartRate.average);
          }

          for (let i = 6; i >= 0; i--) {
            if (activityTime === days[i].dayTimestamp) {
              days[i].minBpm = activity.heartRate?.min || 0;
              days[i].maxBpm = activity.heartRate?.max || 0;
              days[i].averageBpm = activity.heartRate?.average || 0;
              break;
            }
          }
        }
      });

      const formatedDaysData = days.map((d) => ({
        name: d.name,
        minBpm: d.minBpm,
        maxBpm: d.maxBpm,
        averageBpm: d.averageBpm,
      }));

      const average =
        totalBpm.length > 0
          ? Math.round(
              totalBpm.reduce((sum, current) => sum + current, 0) /
                totalBpm.length,
            )
          : 0; // Sécurité si pas de données pour éviter un NaN

      return {
        currentPeriodActivities: formatedDaysData,
        periodLabel: label,
        totalAverageBpm: average,
      };
    }, [endDate, activities]);

  const handleNext = () => {
    setEndDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const handlePrevious = () => {
    setEndDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  return (
    <div className={styles.weekBpmGraph}>
      <div className={styles.header}>
        <p className={`heading-4 ${styles.average}`}>{totalAverageBpm} BPM</p>
        <div className={styles.selector}>
          <button
            onClick={handlePrevious}
            className="btn-small btn-small-white"
          >{`<`}</button>
          <span className={`body-small ${styles.period}`}>{periodLabel}</span>
          <button
            onClick={handleNext}
            className="btn-small btn-small-white"
          >{`>`}</button>
        </div>
      </div>
      <p className={`body-small ${styles.grayStrong}`}>
        Fréquence cardiaque moyenne
      </p>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentPeriodActivities}
            margin={{ top: 10, right: 10, left: -35, bottom: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CartesianGrid
              stroke="#F1F1F1"
              strokeDasharray="2 2"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "var(--color-gray-medium)" }}
              tickLine={false}
              tick={{ fill: "#707070", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              type="number"
              domain={[0, "maxBpm + 100"]}
              axisLine={{ stroke: "var(--color-gray-medium)" }}
              tickLine={false}
              tick={{ fill: "#707070", fontSize: 10 }}
            />
            <Bar
              dataKey="minBpm"
              fill="#FCC1B6"
              radius={[10, 10, 10, 10]}
              barSize={14}
            />
            <Line
              type="monotone"
              dataKey="averageBpm"
              strokeWidth={3}
              stroke={
                isHovered
                  ? "var(--color-blue-strong)"
                  : "var(--color-bg-primary)"
              }
              dot={{
                r: 4,
                fill: "var(--color-blue-strong)",
                stroke: "#FFF",
                strokeWidth: 1.5,
              }}
              animationDuration={300}
              animationEasing="ease-in-out"
            />
            <Bar
              dataKey="maxBpm"
              fill="#F4320B"
              radius={[10, 10, 10, 10]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.info}>
          <div className={styles.bpm}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FCC1B6",
              }}
            ></span>
            <span className="body-small">Min</span>
          </div>
          <div className={styles.bpm}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#F4320B",
              }}
            ></span>
            <span className="body-small">Max BPM</span>
          </div>
          <div>
            <div className={styles.bpm}>
              <div className={styles.averageBpm}>
                <span className={styles.averageBpmDot}>-</span>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#0B23F4",
                    border: "1px",
                    borderColor: "var(--color-white)",
                    marginTop: "1.5px",
                  }}
                ></span>
                <span className={styles.averageBpmDot}>-</span>
              </div>

              <span className="body-small">BPM Moyen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekBpmGraph;
