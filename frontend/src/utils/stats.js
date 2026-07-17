// Returns distance for current week
export const getCurrentWeekDistance = () => {
  const date = new Date(dateInput);
  const currentDay = date.getDay();

  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;

  const monday = new Date(date);
  monday.setDate(date.getDate() + daysToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
};

// Return an object with hours and minutes based
// on a total duration { hours: '25h', minutes: '15min' }
export const getTotalRunningTime = (activities = []) => {
  if (!Array.isArray(activities)) {
    return { hours: "0h", minutes: "0min" };
  }

  const duration = activities.reduce((acc, current) => {
    return acc + current.duration;
  }, 0);
  const hours = Math.trunc(duration / 60).toString() + "h";
  const minutes = Math.trunc(duration % 60).toString() + "min";

  return { hours: hours, minutes: minutes };
};

// Returns the total distance for all the sessions
export const getTotalDistance = (activities = []) => {
  if (!Array.isArray(activities)) return 0;

  const distance = activities.reduce((acc, current) => {
    return acc + current.distance;
  }, 0);

  return distance;
};

export const getTotalCaloriesBurned = (activities = []) => {
  if (!Array.isArray(activities)) return 0;

  return activities.reduce((acc, current) => acc + current.caloriesBurned, 0);
};

// Returns the total of days with and without activities
export const getTotalDays = (activities = [], registeringDate) => {
  // Checking if input parameters are incorrect
  if (!registeringDate || !Array.isArray(activities)) return 0;

  const firstDate = new Date(registeringDate); // first day is user registration day
  const lastDate = new Date(); // last day is today

  // Calculation of total days between first day and today
  const timeDifference = lastDate - firstDate;
  const totalDays = Math.trunc(timeDifference / (1000 * 60 * 60 * 24) + 1);

  // If result is not positive, return 0
  if (totalDays < 1) return 0;

  // Counting number of active days (only for the days)
  // between first date and last date.
  const activeDays = activities.filter((activity) => {
    const activeDate = new Date(activity.date);

    return activeDate >= firstDate && activeDate <= lastDate;
  }).length;

  return { rest: totalDays - activeDays, sessions: activeDays };
};
