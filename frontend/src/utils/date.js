// wait a date as string 2025-01-01
// and convert it to lundi 1 janvier 2025
export const formatToLongDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatToShortDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

// Generate start and end date of the current week
// in an object with 2 strings
export const getWeekRange = (dateInput = new Date()) => {
  const targetDate = dateInput;
  const dayOfWeek = targetDate.getDay(); // 0 = Dimanche, 1 = Lundi, etc.

  // Trouver le lundi de la semaine en cours
  // Si c'est dimanche (0), on recule de 6 jours. Sinon on recule de (dayOfWeek - 1)
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const start = new Date(targetDate);
  start.setDate(targetDate.getDate() - daysToMonday);
  start.setHours(0, 0, 0, 0);

  // Trouver le dimanche de la semaine en cours
  // Si c'est dimanche (0), on ajoute 0. Sinon on ajoute (7 - dayOfWeek)
  const daysToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const end = new Date(targetDate);
  end.setDate(targetDate.getDate() + daysToSunday);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// Used for graph tooltips (to display 01.06 for the dates during
// mouse over on the graphs)
export const formatTooltipDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because months start at 0
  return `${day}.${month}`;
};
