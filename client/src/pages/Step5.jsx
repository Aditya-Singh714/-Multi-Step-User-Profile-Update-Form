// src/pages/Step5.jsx
import { motion as Motion } from "framer-motion";

const Step5 = ({ formData, prevStep, onSubmit }) => {
  const {
    username,
    gender,
    customGender,
    dob,
    profession,
    companyName,
    profilePhoto,
    country,
    state,
    city,
    subscriptionPlan,
    newsletter,
    currentPassword,
    newPassword,
  } = formData;

  const displayGender = gender === "Other" ? customGender : gender;

  const profileImagePreview = profilePhoto
    ? URL.createObjectURL(profilePhoto)
    : null;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">
        Step 5: Review & Submit
      </h2>

      {/* Personal Info */}
      <div>
        <h3 className="font-semibold text-gray-700">Personal Info</h3>
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Gender:</strong> {displayGender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {dob}
        </p>
      </div>

      {/* Profession */}
      <div>
        <h3 className="font-semibold text-gray-700">Profession</h3>
        <p>
          <strong>Profession:</strong> {profession}
        </p>
        {profession !== "Student" && (
          <p>
            <strong>Company:</strong> {companyName}
          </p>
        )}
        {profileImagePreview && (
          <div className="mt-2">
            <p className="font-semibold text-gray-700 mb-1">Profile Image:</p>
            <img
              src={profileImagePreview}
              alt="Profile Preview"
              className="h-24 w-24 rounded-full object-cover border"
            />
          </div>
        )}
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-gray-700">Location</h3>
        <p>
          {city}, {state}, {country}
        </p>
      </div>

      {/* Preferences */}
      <div>
        <h3 className="font-semibold text-gray-700">Preferences</h3>
        <p>
          <strong>Plan:</strong> {subscriptionPlan}
        </p>
        <p>
          <strong>Newsletter:</strong>{" "}
          {newsletter ? "Subscribed" : "Not Subscribed"}
        </p>
        {currentPassword && (
          <p>
            <strong>Current Password:</strong> ••••••••
          </p>
        )}
        {newPassword && (
          <p className="text-yellow-700 font-medium">
            Password will be updated.
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </Motion.div>
  );
};

export default Step5;
