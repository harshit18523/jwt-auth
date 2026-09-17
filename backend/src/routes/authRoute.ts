import { Router } from "express";
import { login, logout, refreshAccessToken, signup } from "../controllers/authController.js";
import verifyJwt, { type AuthRequest } from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", verifyJwt, logout);
router.post("/refresh-access-token", refreshAccessToken);

router.get("/me", verifyJwt, async (req: AuthRequest, res) => {
  const user = await User.findById(req.user?.userId);
  return res.status(200).json(user);
});

export default router;
