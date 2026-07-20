import styles from "./style.module.css";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const RenderCustomLabel = ({ cx, cy, outerRadius, name, fill, index }) => {
  const RADIAN = Math.PI / 180;

  // Angles fixes pour placer exactement les blocs comme sur ta capture :
  // Index 0 ('5 réalisées') -> bas-gauche (205°)
  // Index 1 ('2 restants') -> haut-droite (40°)
  const customAngle = index === 0 ? 205 : 40;

  // Distance du texte par rapport au centre du donut
  const radius = outerRadius * 1.1;

  const x = cx + radius * Math.cos(-customAngle * RADIAN);
  const y = cy + radius * Math.sin(-customAngle * RADIAN);

  const isRightSide = x > cx;

  return (
    <g>
      {/* On crée un seul élément de texte SVG */}
      <text
        x={x}
        y={y}
        fill="#707070"
        // Si c'est à droite, on aligne le début du texte. À gauche, la fin du texte.
        textAnchor={isRightSide ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "10px", fontFamily: "inter", fontWeight: 400 }}
      >
        {isRightSide ? (
          // Côté DROIT : Le point (•) d'abord, puis le texte
          <tspan>
            <tspan fill={fill} style={{ fontSize: "18px", fontWeight: "bold" }}>
              •{" "}
            </tspan>
            {name}
          </tspan>
        ) : (
          // Côté GAUCHE : Le point (•) d'abord, puis le texte
          // En SVG, pour garder le point à gauche même quand textAnchor="end",
          // on écrit le point en premier dans le flux de lecture !
          <tspan>
            <tspan fill={fill} style={{ fontSize: "18px", fontWeight: "bold" }}>
              •{" "}
            </tspan>
            {name}
          </tspan>
        )}
      </text>
    </g>
  );
};

function WeekActivity({ goal = 0, activities = 0 }) {
  const data = [
    {
      name: `${activities} réalisées`,
      value: activities,
      color: "var(--color-blue-strong",
    }, // Bleu foncé
    { name: `${goal} restants`, value: goal, color: "var(--color-blue-light" }, // Bleu clair pastel
  ];

  return (
    <div className={styles.weekActivity}>
      <div className={styles.main}>
        <h3>
          <span className={`heading-3 ${styles.activities}`}>
            x{activities}
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
              // On désactive la ligne de liaison (la flèche) entre le donut et le texte
              labelLine={false}
              cx="50%" // Centre horizontal au milieu
              cy="50%" // Centre vertical au milieu
              innerRadius="42%" // Rayon intérieur (crée le trou du donut)
              outerRadius="85%" // Rayon extérieur
              paddingAngle={0} // Espace entre les deux blocs (optionnel)
              cornerRadius={2.45} // Arrondit les bords des segments 🪄
              startAngle={0} // Commence en haut à 12h
              endAngle={-360} // Tourne dans le sens des aiguilles d'une montre
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeekActivity;
