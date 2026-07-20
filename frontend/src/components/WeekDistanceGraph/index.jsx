import styles from "./style.module.css";
import { formatTooltipDate } from "../../utils/date";
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <p className="body-small">{data.period}</p>
        <p className="body-large">{data.km} km</p>
      </div>
    );
  }
  return null;
};

function WeekDistanceGraph({ activities = [] }) {
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

  const { currentPeriodActivities, periodLabel, averageKm } = useMemo(() => {
    // 1. Définir proprement le lundi de départ sans casser la référence
    const startOfPeriod = new Date(endDate);
    startOfPeriod.setDate(endDate.getDate() - 27);
    startOfPeriod.setHours(0, 0, 0, 0);

    const startTime = startOfPeriod.getTime();
    const endTime = endDate.getTime();

    const options = { day: "numeric", month: "short" };
    const label = `${startOfPeriod.toLocaleDateString("fr-FR", options)} - ${endDate.toLocaleDateString("fr-FR", options)}`;

    // 2. Création des semaines avec des copies fraîches pour éviter les mutations en chaîne
    const weeks = [
      { name: "S1", km: 0, dayOffset: 0 },
      { name: "S2", km: 0, dayOffset: 7 },
      { name: "S3", km: 0, dayOffset: 14 },
      { name: "S4", km: 0, dayOffset: 21 },
    ].map((w) => {
      const weekStart = new Date(startOfPeriod);
      weekStart.setDate(startOfPeriod.getDate() + w.dayOffset);
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      return {
        name: w.name,
        km: w.km,
        startTime: weekStart.getTime(),
        endTime: weekEnd.getTime(),
        // On garde les objets Date d'origine uniquement pour le formater dans le tooltip
        displayStart: weekStart,
        displayEnd: weekEnd,
      };
    });

    let totalKm = 0;

    // 3. Boucle de tri sur les activités avec des comparaisons de nombres (timestamps)
    activities.forEach((activity) => {
      const activityTime = new Date(activity.date).getTime();

      if (activityTime >= startTime && activityTime <= endTime) {
        totalKm += activity.distance || 0;

        for (let i = 3; i >= 0; i--) {
          if (
            activityTime >= weeks[i].startTime &&
            activityTime <= weeks[i].endTime
          ) {
            weeks[i].km += activity.distance || 0;
            break;
          }
        }
      }
    });

    const formatedWeeksData = weeks.map((w) => ({
      name: w.name,
      km: w.km.toFixed(1),
      period: `${formatTooltipDate(w.displayStart)} au ${formatTooltipDate(w.displayEnd)}`,
    }));

    const average = Math.round(totalKm / 4);

    return {
      currentPeriodActivities: formatedWeeksData,
      periodLabel: label,
      averageKm: average,
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
    <div className={styles.weekDistanceGraph}>
      <div className={styles.header}>
        <p className={`heading-4 ${styles.average}`}>
          {averageKm}km en moyenne
        </p>
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
        Total des kilomètres des 4 dernières semaines
      </p>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentPeriodActivities}
            margin={{ top: 10, right: 10, left: -40, bottom: 0 }}
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
              axisLine={{ stroke: "var(--color-gray-medium)" }}
              tickLine={false}
              tick={{ fill: "#707070", fontSize: 10 }}
              domain={[0, "auto"]}
            />
            <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="km"
              fill={
                isHovered
                  ? "var(--color-blue-strong)"
                  : "var(--color-blue-light)"
              }
              radius={[10, 10, 10, 10]}
              barSize={14}
              animationDuration={300}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className={styles.km}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#7987FF",
            }}
          ></span>
          <span className="body-small">Km</span>
        </div>
      </div>
    </div>
  );
}

export default WeekDistanceGraph;
