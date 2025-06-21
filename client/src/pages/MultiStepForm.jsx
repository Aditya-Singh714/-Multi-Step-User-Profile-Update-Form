// src/pages/MultiStepForm.jsx
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    customGender: "",
    dob: "",
    profession: "",
    companyName: "",
    profilePhoto: null,
    country: "",
    state: "",
    city: "",
    subscriptionPlan: "",
    newsletter: true,
    currentPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const form = new FormData();

    // Determine final password to submit
    const passwordToSend = formData.newPassword || formData.currentPassword;
    if (!passwordToSend) {
      alert("Password is required.");
      return;
    }

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "newPassword" || key === "currentPassword") return; // skip
      if (value) form.append(key, value);
    });

    form.append("password", passwordToSend); // required by backend

    try {
      await axios.post("/api/profile", form);
      navigate("/success");
    } catch (err) {
      console.error("Submission error:", err);
      alert(
        `Failed to submit profile. ${err?.response?.data?.error || err.message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        {step === 1 && (
          <Step1
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <Step4
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 5 && (
          <Step5
            formData={formData}
            prevStep={prevStep}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
