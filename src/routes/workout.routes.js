import express from "express";
import { addWorkout, getWorkouts } from "../controllers/workout.controller.js";
import { verify } from "../middleware/auth.js";


const router = express.Router();


router.post("/addWorkout", verify, addWorkout);
router.get("/getMyWorkouts", verify, getWorkouts);


export default router;
