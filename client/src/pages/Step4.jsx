// src/pages/Step4.jsx
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";

const Step4 = ({ formData, updateField, nextStep, prevStep }) => {
  const [passwordStrength, setPasswordStrength] = useState({
    label: "",
    color: "",
  });

  const getPasswordStrength = (password) => {
    if (!password) return { label: "", color: "" };

    const length = password.length >= 8;
    const number = /\d/.test(password);
    const special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [length, number, special].filter(Boolean).length;

    if (score === 3) return { label: "Strong", color: "bg-green-500" };
    if (score === 2) return { label: "Medium", color: "bg-yellow-500" };
    if (score === 1) return { label: "Weak", color: "bg-red-500" };

    return { label: "", color: "" };
  };

  useEffect(() => {
    setPasswordStrength(getPasswordStrength(formData.newPassword));
  }, [formData.newPassword]);

  const handleNext = () => {
    if (!formData.subscriptionPlan) {
      alert("Please choose a subscription plan.");
      return;
    }

    if (formData.newPassword) {
      const valid = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(
        formData.newPassword
      );
      if (!valid) {
        alert("New password is too weak.");
        return;
      }
      if (!formData.currentPassword) {
        alert("Please enter current password to change password.");
        return;
      }
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
        Step 4: Preferences & Security
      </h2>

      {/* Subscription Plan */}
      <div>
        <label className="block mb-1 text-gray-700">Subscription Plan</label>
        <div className="flex flex-wrap gap-4">
          {["Basic", "Pro", "Enterprise"].map((plan) => (
            <label key={plan} className="flex items-center gap-2">
              <input
                type="radio"
                value={plan}
                checked={formData.subscriptionPlan === plan}
                onChange={(e) =>
                  updateField("subscriptionPlan", e.target.value)
                }
              />
              {plan}
            </label>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) => updateField("newsletter", e.target.checked)}
        />
        <label className="text-gray-700">Subscribe to Newsletter</label>
      </div>

      {/* New Password */}
      <div>
        <label className="block mb-1 text-gray-700">New Password</label>
        <input
          type="password"
          value={formData.newPassword}
          onChange={(e) => updateField("newPassword", e.target.value)}
          placeholder="Leave empty to keep current password"
          className="w-full border rounded-lg p-2"
        />
        {formData.newPassword && (
          <>
            <div className="mt-2 w-full h-2 bg-gray-200 rounded">
              <div
                className={`h-full ${passwordStrength.color} rounded transition-all`}
                style={{
                  width: `${
                    passwordStrength.label === "Strong"
                      ? 100
                      : passwordStrength.label === "Medium"
                      ? 66
                      : 33
                  }%`,
                }}
              />
            </div>
            <p className="text-sm mt-1 text-gray-700">
              Strength:{" "}
              <span className={`font-semibold ${passwordStrength.color}`}>
                {passwordStrength.label}
              </span>
            </p>
          </>
        )}
      </div>

      {/* Current Password (only if new password is entered) */}
      {formData.newPassword && (
        <div>
          <label className="block mb-1 text-gray-700">Current Password</label>
          <input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => updateField("currentPassword", e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>
      )}

      {/* Navigation */}
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

export default Step4;
