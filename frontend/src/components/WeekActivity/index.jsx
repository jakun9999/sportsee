import styles from "./style.module.css";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getCurrentWeekActivitiesCount } from "../../utils/stats";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const RenderCustomLabel = ({ cx, cy, outerRadius, name, fill, index }) => {
  const RADIAN = Math.PI / 180;
  const customAngle = index === 0 ? 205 : 40;
  const radius = outerRadius * 1.1;

  const x = cx + radius * Math.cos(-customAngle * RADIAN);
  const y = cy + radius * Math.sin(-customAngle * RADIAN);

  const isRightSide = x > cx;

  return (
    <g>
      <text
        x={x}
        y={y}
        fill="#707070"
        textAnchor={isRightSide ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "10px", fontFamily: "inter", fontWeight: 400 }}
      >
        <tspan>
          <tspan
            fill={fill}
            dy="-1.5px"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            •{" "}
          </tspan>
          <tspan dy="1.5px">{name}</tspan>
        </tspan>
      </text>
    </g>
  );
};

function WeekActivity() {
  const { profile, activities, isLoading } = useData();
  const { weeklyGoal } = useAuth();

  // On calcule l'état de préparation
  const isDataReady = !isLoading && profile && activities && weeklyGoal;

  const activityCount = isDataReady
    ? getCurrentWeekActivitiesCount(activities)
    : 0;
  const goal = weeklyGoal ?? 0;
  const remaining = Math.max(0, goal - activityCount);

  const data = [
    {
      name: `${activityCount} réalisées`,
      value: activityCount,
      color: "var(--color-blue-strong)",
    },
    {
      name: `${remaining} restants`,
      value: remaining,
      color: "var(--color-blue-light)",
    },
  ];

  return (
    <div className={styles.weekActivity}>
      {!isDataReady ? (
        <div className={styles.loading}>
          Chargement de l'activité en cours...
        </div>
      ) : (
        <>
          <div className={styles.main}>
            <h3>
              <span className={`heading-3 ${styles.activities}`}>
                x{activityCount}
              </span>
              <span className={`body-large ${styles.goals}`}>
                {" "}
                sur un objectif de {goal}
              </span>
            </h3>
            <p className={`body-default ${styles.label}`}>
              Courses hebdomadaires réalisées
            </p>
          </div>
          <div className={styles.stats}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  label={<RenderCustomLabel />}
                  labelLine={false}
                  cx="50%"
                  cy="50%"
                  innerRadius="42%"
                  outerRadius="85%"
                  paddingAngle={0}
                  cornerRadius={2.45}
                  startAngle={0}
                  endAngle={-360}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default WeekActivity;
