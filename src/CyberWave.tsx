"use client";

import { motion } from "framer-motion";

const CyberWave = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-full h-[200px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-50"
        style={{
          filter: "blur(80px)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        animate={{
          x: ["-50%", "50%", "-50%"], // Move wave left and right
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default CyberWave;



