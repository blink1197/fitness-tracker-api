import express from "express";
import { addWorkout, completeWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../controllers/workout.controller.js";
import { verify } from "../middleware/auth.js";


const router = express.Router();


router.post("/addWorkout", verify, addWorkout);
router.get("/getMyWorkouts", verify, getWorkouts);
router.patch("/updateWorkout/:workoutId", verify, updateWorkout);
router.patch("/completeWorkoutStatus/:workoutId", verify, completeWorkout)
router.delete("/deleteWorkout/:workoutId", verify, deleteWorkout);

export default router;
