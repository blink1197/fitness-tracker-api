import express from "express";
import { getProfile, loginUser, registerUser } from "../controllers/user.controller.js";
import { verify } from "../middleware/auth.js";


const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", verify, getProfile);

export default router;
