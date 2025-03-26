import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete();
    }, 3000); // Show the preloader for 3 seconds
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.5 }}
    >
      <img
        src="/logo1.webp" // Replace with your actual image path
        alt="Loading..."
        className="w-48 h-48 animate-pulse"
      />
    </motion.div>
  );
};

export default Preloader;
