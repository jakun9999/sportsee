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

// Generate start and end date of the current week
// in an object with 2 strings
export const getWeekRange = (dateInput = new Date()) => {
  const date = new Date(dateInput);
  const currentDay = date.getDay();

  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(date);
  monday.setDate(date.getDate() + daysToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return {
    start: monday.toLocaleDateString("fr-FR", formatOptions),
    end: sunday.toLocaleDateString("fr-FR", formatOptions),
  };
};
