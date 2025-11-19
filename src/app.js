import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import workoutRoutes from "./routes/workout.routes.js";


dotenv.config();


const app = express();


// Middleware
app.use(    // Allow access from anywhere for now
    cors({
        origin: "*",
        // origin: allowedOrigins,
        //credentials: true,
    })
);
app.use(express.json());


// Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// For UptimeRobot Monitoring DO NOT DELETE
app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});


// Global Error Handler
app.use(errorHandler);

export default app;
