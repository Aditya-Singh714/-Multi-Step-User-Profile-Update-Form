// src/pages/Step1.jsx
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import axios from "../utils/axios";

const Step1 = ({ formData, updateField, nextStep }) => {
  const [usernameStatus, setUsernameStatus] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!formData.username.trim()) {
      setUsernameStatus("");
      return;
    }

    setIsChecking(true);
    const delay = setTimeout(() => {
      axios
        .get(`/api/check-username/${formData.username}`)
        .then((res) => {
          setUsernameStatus(res.data.available ? "✅ Available" : "❌ Taken");
        })
        .catch(() => {
          setUsernameStatus("Error checking username");
        })
        .finally(() => setIsChecking(false));
    }, 500);

    return () => clearTimeout(delay);
  }, [formData.username]);

  const isFutureDate = (date) => {
    const selected = new Date(date);
    const today = new Date();
    return selected > today;
  };

  const handleNext = () => {
    if (!formData.username || !formData.gender || !formData.dob) {
      alert("Please fill in all required fields.");
      return;
    }

    if (usernameStatus === "❌ Taken") {
      alert("Username is already taken. Please choose another.");
      return;
    }

    if (formData.gender === "Other" && !formData.customGender.trim()) {
      alert("Please specify your gender.");
      return;
    }

    if (isFutureDate(formData.dob)) {
      alert("Date of birth cannot be in the future.");
      return;
    }

    nextStep();
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Step 1: Personal Info
      </h2>

      {/* Username */}
      <div>
        <label className="block mb-1 text-gray-700">Username</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => updateField("username", e.target.value)}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:border-indigo-500"
        />
        <p className="text-sm text-gray-500 mt-1">
          {isChecking ? "Checking..." : usernameStatus}
        </p>
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-1 text-gray-700">Gender</label>
        <div className="flex gap-4">
          {["Male", "Female", "Other"].map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                value={option}
                checked={formData.gender === option}
                onChange={(e) => updateField("gender", e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>

        {formData.gender === "Other" && (
          <input
            type="text"
            placeholder="Please specify"
            value={formData.customGender}
            onChange={(e) => updateField("customGender", e.target.value)}
            className="mt-2 w-full border rounded-lg p-2"
          />
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block mb-1 text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => updateField("dob", e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Next Button */}
      <div className="text-right">
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Next
        </button>
      </div>
    </Motion.div>
  );
};

export default Step1;
