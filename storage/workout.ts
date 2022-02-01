import { containsKey, getData, removeItem, storeData } from ".";
import { Workout } from "../types/data";
import data from "../data.json";

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData("workout-data");
  return workouts;
};

export const initWorkout = async (): Promise<boolean> => {
  const hasWorkouts = await containsKey("workout-data");
  if (!hasWorkouts) {
    await storeData("workout-data", data);
    return true;
  }
  return false;
};

export const clearWorkout = async () => {
  await removeItem("workout-data");
};
