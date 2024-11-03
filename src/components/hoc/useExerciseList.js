import { useQuery } from "@tanstack/react-query";
import ExerciseService from "../../services/exercise/exercise.service.js";

export const useExerciseList = () => {
  return useQuery({
    queryKey: ["exerciseList"],
    queryFn: ExerciseService.getAllExercises,
  });
};
