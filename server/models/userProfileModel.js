// models/UserProfile.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  gender: String,
  customGender: String,
  dob: String,
  profession: String,
  companyName: String,
  profilePhoto: String,
  country: String,
  state: String,
  city: String,
  subscriptionPlan: String,
  newsletter: Boolean,
  password: { type: String, required: true },
});

// Hash password before saving (only if modified)
userProfileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
