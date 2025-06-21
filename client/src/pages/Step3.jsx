// src/pages/Step3.jsx
import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import axios from "../utils/axios";

const Step3 = ({ formData, updateField, nextStep, prevStep }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      const res = await axios.get("/api/countries");
      setCountries(res.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!formData.country) return;

    const fetchStates = async () => {
      try {
        const res = await axios.get(`/api/states/${formData.country}`);
        setStates(res.data);
        updateField("state", "");
        updateField("city", "");
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [formData.country]);

  useEffect(() => {
    if (!formData.state) return;

    const fetchCities = async () => {
      try {
        const res = await axios.get(`/api/cities/${formData.state}`);
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [formData.state]);

  const handleNext = () => {
    if (!formData.country || !formData.state || !formData.city) {
      alert("Please select country, state and city.");
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
        Step 3: Preferences
      </h2>

      {/* Country */}
      <div>
        <label className="block mb-1 text-gray-700">Country</label>
        <select
          value={formData.country}
          onChange={(e) => updateField("country", e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      {states.length > 0 && (
        <div>
          <label className="block mb-1 text-gray-700">State</label>
          <select
            value={formData.state}
            onChange={(e) => updateField("state", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* City */}
      {cities.length > 0 && (
        <div>
          <label className="block mb-1 text-gray-700">City</label>
          <select
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

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

export default Step3;
