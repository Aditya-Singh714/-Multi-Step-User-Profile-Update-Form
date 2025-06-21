import bcrypt from "bcryptjs";
import userProfileModel from "../models/userProfileModel.js";

export const verifyPassword = async (req, res) => {
  const { username, currentPassword } = req.body;

  try {
    const user = await userProfileModel.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
