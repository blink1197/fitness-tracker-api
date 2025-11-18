import Workout from "../models/workout.model.js";
import AppError from "../utils/AppError.js";


export const addWorkout = async (req, res, next) => {
    try {
        const { name, duration, status } = req.body;
        const userId = req.user.id;

        // Input validation
        if (!name || !duration || !status) throw new AppError("Missing required fields", 400);

        // Check if workout name already exists
        // const existingWorkout = await Workout.findOne({ name });
        // if (existingWorkout) throw new AppError("Workout name already exists", 409);

        const workout = await Workout.create({
            userId,
            name,
            duration,
            status
        });

        res.status(201).json({ ...workout._doc });

    } catch (error) {
        next(error)
    }
}