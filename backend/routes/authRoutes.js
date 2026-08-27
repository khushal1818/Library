import express from "express";
import {
  registerUser,
  completeProfile,
  loginUser,
  registerAdmin,
  verifyOTP,
  getProfile,
  updateProfile,
  getUsers,
} from "../controllers/authControllers.js";

import {
  authenticateToken,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/complete-profile", completeProfile);

authRouter.post("/login", loginUser);
authRouter.post("/register-admin", registerAdmin);

//protected routes
authRouter.get("/me", authenticateToken, getProfile);
authRouter.put("/update-profile", authenticateToken, updateProfile);

authRouter.get("/users", authenticateToken, authorizeRoles("admin"), getUsers);

export default authRouter;