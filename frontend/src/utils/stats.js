import { getWeekRange } from "./date";
import { useData } from "../contexts/DataContext";

// Returns activities between 2 dates
export function getActivitiesByTime(start, end) {
  const { activities } = useData();
  if (!Array.isArray(activities)) return 0;

  const selectedActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.date);

    return activityDate >= start && activityDate <= end;
  });

  return selectedActivities;
}

// Returns activity time for current week
export function getCurrentWeekActiveTime() {
  const { activities } = useData();
  if (!Array.isArray(activities)) return 0;

  const { start, end } = getWeekRange(new Date());
  const weeklyActivities = getActivitiesByTime(start, end);

  return weeklyActivities.reduce((acc, current) => {
    return acc + current.duration;
  }, 0);
}

// Returns distance for current week
export function getCurrentWeekDistance() {
  const { activities } = useData();
  if (!Array.isArray(activities)) return 0;

  const { start, end } = getWeekRange(new Date());
  const weeklyActivities = getActivitiesByTime(start, end);

  return weeklyActivities.reduce((acc, current) => {
    return acc + current.distance;
  }, 0);
}

// returns number of activities for current week
export function getCurrentWeekActivitiesCount() {
  const { activities } = useData();
  if (!Array.isArray(activities)) return 0;

  const { start, end } = getWeekRange(new Date());
  const weeklyActivities = getActivitiesByTime(start, end);

  return weeklyActivities.length;
}

// Return an object with hours and minutes based
// on a total duration { hours: '25h', minutes: '15min' }
export function getTotalRunningTime() {
  const { activities } = useData();
  if (!Array.isArray(activities)) {
    return { hours: "0h", minutes: "0min" };
  }

  const duration = activities.reduce((acc, current) => {
    return acc + current.duration;
  }, 0);
  const hours = Math.trunc(duration / 60).toString() + "h";
  const minutes = Math.trunc(duration % 60).toString() + "min";

  return { hours: hours, minutes: minutes };
}

// Returns the total distance for all the sessions
export function getTotalDistance() {
  const { activities } = useData();
  if (!Array.isArray(activities)) return 0;

  const distance = activities.reduce((acc, current) => {
    return acc + current.distance;
  }, 0);

  return distance;
}

export function getTotalCaloriesBurned() {
  const { activities } = useData();
  if (!Array.isArray(activities)) return 0;

  return activities.reduce((acc, current) => acc + current.caloriesBurned, 0);
}

// Returns the total of days with and without activities
export function getTotalDays(registeringDate) {
  const { activities } = useData();
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
}
