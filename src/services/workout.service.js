import { caxios } from "../api.js";

class WorkoutService {
  getAllWorkouts() {
    return caxios.get("/workout");
  }
  getOneWorkout(id) {
    return caxios.get(`/workout/${id}`);
  }
  createWorkout(data) {
    return caxios.post("/workout/create", data);
  }
  updateWorkout(id, data) {
    return caxios.put(`/workout/${id}`, data);
  }
  deleteWorkout(id) {
    return caxios.delete(`/workout/${id}`);
  }
}

export default new WorkoutService();
