import express from "express";
import { addWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../controllers/workout.controller.js";
import { verify } from "../middleware/auth.js";


const router = express.Router();


router.post("/addWorkout", verify, addWorkout);
router.get("/getMyWorkouts", verify, getWorkouts);
router.patch("/updateWorkout/:workoutId", verify, updateWorkout);
router.delete("/deleteWorkout/:workoutId", verify, deleteWorkout);

export default router;
