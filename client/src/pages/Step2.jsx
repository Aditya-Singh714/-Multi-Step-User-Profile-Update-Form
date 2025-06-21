// src/pages/Step2.jsx
import { useRef, useState } from "react";
import { motion as Motion } from "framer-motion";

const Step2 = ({ formData, updateField, nextStep, prevStep }) => {
  const [fileError, setFileError] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const professions = ["Student", "Developer", "Entrepreneur"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    const isValidSize = file.size <= 2 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      setFileError("Only JPG/PNG files under 2MB are allowed.");
      return;
    }

    updateField("profilePhoto", file);
    setFileError("");
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (!formData.profession) {
      alert("Please select your profession.");
      return;
    }
    if (
      formData.profession !== "Student" &&
      (!formData.companyName || formData.companyName.trim() === "")
    ) {
      alert("Please enter your company name.");
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
        Step 2: Professional Details
      </h2>

      {/* Profession */}
      <div>
        <label className="block mb-1 text-gray-700">Profession</label>
        <select
          value={formData.profession}
          onChange={(e) => updateField("profession", e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select...</option>
          {professions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Company Name (conditionally visible) */}
      {formData.profession && formData.profession !== "Student" && (
        <div>
          <label className="block mb-1 text-gray-700">Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
      )}

      {/* Profile Photo Upload */}
      <div>
        <label className="block mb-1 text-gray-700">Profile Picture</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-700"
        />
        {fileError && <p className="text-sm text-red-500 mt-1">{fileError}</p>}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-24 w-24 rounded-full object-cover border"
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>
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

export default Step2;
