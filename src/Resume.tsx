"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Resume = () => {
  return (
    <motion.div 
      className="flex justify-center mt-4"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.a
        href="/Isaac_Mungai_Resume.pdf"
        download="Isaac_Mungai_Resume.pdf"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300 hover:shadow-2xl">
          <Download size={20} className="animate-bounce" /> 
          Download Resume
        </Button>
      </motion.a>
    </motion.div>
  );
};

export default Resume;
