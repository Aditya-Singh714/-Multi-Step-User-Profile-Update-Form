// src/pages/Success.jsx
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center px-4"
    >
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md">
        <Motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-green-700 mb-4"
        >
          🎉 Profile Updated!
        </Motion.h1>
        <p className="text-gray-700 mb-6">
          Your profile information was successfully saved. You can come back
          anytime to update it again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </Motion.div>
  );
};

export default Success;
