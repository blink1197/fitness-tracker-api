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

export const getWorkouts = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const workouts = await Workout.find({ userId });
        if (!workouts) throw new AppError("No workouts found", 404);

        res.status(200).json({ workouts });

    } catch (error) {
        next(error)
    }
}

export const updateWorkout = async (req, res, next) => {
    try {
        const { name, duration, status } = req.body;
        const { workoutId } = req.params;
        const userId = req.user.id;

        // Find workout
        const workout = await Workout.findOne({ _id: workoutId, userId });
        if (!workout) throw new AppError("Workout not found or unauthorized", 404);

        // Update only provided fields
        if (name) workout.name = name;
        if (duration) workout.duration = duration;
        if (status) workout.status = status;

        await workout.save();

        res.status(200).json({
            message: "Workout updated successfully",
            updatedWorkout: workout._doc
        });

    } catch (error) {
        next(error);
    }
};

export const deleteWorkout = async (req, res, next) => {
    try {
        const { workoutId } = req.params;
        const userId = req.user.id;

        // Find and delete only if the workout belongs to the user
        const deletedWorkout = await Workout.findOneAndDelete({
            _id: workoutId,
            userId
        });

        if (!deletedWorkout) {
            throw new AppError("Workout not found or unauthorized", 404);
        }

        res.status(200).json({
            message: "Workout deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const completeWorkout = async (req, res, next) => {
    try {
        const { workoutId } = req.params;
        const userId = req.user.id;

        // Find workout
        const workout = await Workout.findOne({ _id: workoutId, userId });
        if (!workout) throw new AppError("Workout not found or unauthorized", 404);

        // Update workout status
        workout.status = "completed";
        await workout.save();

        res.status(200).json({
            message: "Workout status updated successfully",
            updatedWorkout: workout._doc
        });

    } catch (error) {
        next(error);
    }
};