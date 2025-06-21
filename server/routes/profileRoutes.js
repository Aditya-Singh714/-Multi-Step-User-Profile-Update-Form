import express from "express";
import multer from "multer";
import {
  saveProfile,
  checkUsernameAvailability,
  getCountries,
  getStates,
  getCities,
} from "../controllers/profileController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG/PNG allowed"));
  },
});

router.post("/profile", upload.single("profilePhoto"), saveProfile);
router.get("/username-check", checkUsernameAvailability);
router.get("/countries", getCountries);
router.get("/states/:country", getStates);
router.get("/cities/:state", getCities);

export default router;
