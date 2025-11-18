import express from "express";
import { addWorkout } from "../controllers/workout.controller.js";
import { verify } from "../middleware/auth.js";


const router = express.Router();


router.post("/addWorkout", verify, addWorkout);


export default router;
