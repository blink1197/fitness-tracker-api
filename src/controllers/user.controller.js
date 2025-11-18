import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";


export const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) throw new AppError("Missing required fields", 400);

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new AppError("Email already registered", 409);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        await User.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Registered Successfully" });

    } catch (error) {
        next(error);
    }


}