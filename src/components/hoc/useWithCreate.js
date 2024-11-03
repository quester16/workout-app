import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ExerciseService from "../../services/exercise/exercise.service.js";
import WorkoutService from "../../services/workout.service.js";

export const useWithCreate = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      props === "workout"
        ? WorkoutService.createWorkout(data)
        : ExerciseService.createExercise(data),
    onSuccess: () => {
      props === "workout"
        ? reset({ name: "", select: [] })
        : reset({ select: [] });
      console.log("success");
    },
    onError: (error) => {
      console.log("error", error.message);
    },
  });
  const createExercise = (data) => {
    if (props === "wokrout") {
      mutate({
        name: data.name,
        exerciseIds: data.select.map((ex) => ex.value),
      });
    } else {
      mutate({
        name: data.name,
        sets: data.sets,
        exerciseType: data.select.label,
      });
    }
    console.log("createWorkout", {
      name: data.name,
      exerciseIds: data.select.map((ex) => ex.value),
    });
  };

  return { createExercise, errors, register, handleSubmit, control };
};
