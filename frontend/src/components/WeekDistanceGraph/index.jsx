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
  // active est vrai si la souris survole une barre
  // payload contient les données de la barre survolée
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Accède à l'objet complet ({ name, km, period })

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
  // By default the end date the sunday of current week
  // at 23:59:59:999 so that we display full weeks in
  // the graphics.
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
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 27);

    // Formating date for the header information
    const options = { day: "numeric", month: "short" };
    const label = `${startDate.toLocaleDateString("fr-FR", options)} - ${endDate.toLocaleDateString("fr-FR", options)}`;

    const weeks = [
      {
        name: "S1",
        km: 0,
        start: new Date(startDate),
        end: new Date(startDate).setDate(startDate.getDate() + 6),
        label: "",
      },
      {
        name: "S2",
        km: 0,
        start: new Date(startDate).setDate(startDate.getDate() + 7),
        end: new Date(startDate).setDate(startDate.getDate() + (7 + 6)),
        label: "",
      },
      {
        name: "S3",
        km: 0,
        start: new Date(startDate).setDate(startDate.getDate() + 14),
        end: new Date(startDate).setDate(startDate.getDate() + (14 + 6)),
        label: "",
      },
      {
        name: "S4",
        km: 0,
        start: new Date(startDate).setDate(startDate.getDate() + 21),
        end: new Date(startDate).setDate(startDate.getDate() + (21 + 6)),
        label: "",
      },
    ];
    weeks.forEach((w) => (w.start = new Date(w.start)));
    weeks.forEach((w) => (w.end = new Date(w.end)));
    let totalKm = 0;

    // Retrieving km total and by week
    activities.forEach((activity) => {
      const activityDate = new Date(activity.date);

      if (activityDate >= startDate && activityDate <= endDate) {
        totalKm += activity.distance || 0;

        for (let i = 3; i >= 0; i--) {
          if (activityDate >= weeks[i].start) {
            weeks[i].km += activity.distance || 0;
            break;
          }
        }
      }
    });

    // Rounding km data
    const formatedWeeksData = weeks.map((w) => ({
      name: w.name,
      km: w.km.toFixed(1),
      period: `${formatTooltipDate(w.start)} au ${formatTooltipDate(w.end)}`,
    }));

    const average = Math.round(totalKm / 4);

    return {
      currentPeriodActivities: formatedWeeksData,
      periodLabel: label,
      averageKm: average,
    };
  }, [endDate]);

  // Navigation (< and >) management (7 days by 7 days)
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
              axisLine={{ stroke: "var(--color-gray-medium" }}
              tickLine={false}
              tick={{ fill: "#707070", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={{ stroke: "var(--color-gray-medium" }}
              tickLine={false}
              tick={{ fill: "#707070", fontSize: 10 }}
              domain={[0, "auto"]}
            />
            <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="km"
              fill={
                isHovered
                  ? "var(--color-blue-strong"
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
