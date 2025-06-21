// src/components/Home.jsx
import { motion as Motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center px-4">
      <Motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center"
      >
        Update Your Profile. Effortlessly.
      </Motion.h1>

      <Motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-gray-600 text-center max-w-xl mb-8"
      >
        A smooth, guided multi-step form to manage your details, preferences,
        and security in one place.
      </Motion.p>

      <Motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/form")}
        className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md transition duration-200 hover:bg-indigo-700"
      >
        Get Started
      </Motion.button>
    </div>
  );
};

export default Home;
