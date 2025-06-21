import express from "express";
import UserProfile from "../models/userProfileModel.js";

const router = express.Router();

router.get("/check-username/:username", async (req, res) => {
  try {
    const existingUser = await UserProfile.findOne({
      username: req.params.username,
    });
    if (existingUser) {
      return res.json({ available: false });
    }
    res.json({ available: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
