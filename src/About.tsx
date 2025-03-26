import { motion } from "framer-motion";
import SectionBg from "./SectionBg";
import { useState } from "react";
import Resume from "./Resume";
import { Button } from "@/components/ui/button";
import Fireworks from "./Fireworks";
//import FloatingOrbs from "./CyberWave";



interface AboutProps {
    theme: "light" | "dark";
}

const About = ({ theme }: AboutProps) => {
    const [expanded, setExpanded] = useState(false);




    return (
        <section
          id="about"
          className={`relative min-h-screen flex flex-col items-center justify-center bg-transparent px-6 text-center transition-all duration-500 ${
            theme === "light" ? "bg-violet-400 text-black" : "bg-black text-white"
          }`}
        >
            <Fireworks/>

          {/* Background Effect */}
          
            <SectionBg effect="moon" />
         
    
          {/* Animated Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-lg font-medium text-violet">
              Passionate Developer & Problem Solver
            </p>
    
            {/* Short Intro */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="mt-4 text-lg leading-relaxed"
            >
              I am <strong>Isaac Mungai</strong>, a results-driven Computer Science
              student with a passion for software development, networking, and
              artificial intelligence. As the School of Computing and IT
              Representative (SCIT REP) at Kaimosi Friends University , I actively foster innovation and technology
              growth in my university.
            </motion.p>
    
            {/* Read More Section */}
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-left bg-gray-900 p-6 rounded-xl shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-blue-400 mb-2">
                  Technical Skills
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  <li>
                    <strong>Frontend:</strong> React.js, Tailwind CSS, ShadCN,
                    TypeScript
                  </li>
                  <li>
                    <strong>Backend:</strong> Node.js, Express.js, Java
                  </li>
                  <li>
                    <strong>Databases:</strong> MySQL, Database Normalization
                  </li>
                  <li>
                    <strong>Networking:</strong> Java-based network programming, ARM
                    Assembly
                  </li>
                  <li>
                    <strong>Cloud & AI:</strong> AWS DeepRacer, AI-driven business
                    solutions
                  </li>
                  <li>
                    <strong>Projects:</strong> Full-stack apps, e-commerce systems,
                    chat apps
                  </li>
                </ul>
    
                <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
                  Key Projects
                </h2>
                <ul className="list-disc list-inside text-gray-300">
                  <li>
                    <strong>Chatsasa:</strong> A real-time chat app using React,
                    Supabase and Java backend with integrated university
                    navigation.
                  </li>
                  <li>
                    <strong>Portfolio Website:</strong> Built with React, Express.js,
                    and MySQL. Features dynamic content fetching and typing
                    animation.
                  </li>
                  <li>
                    <strong>AI & Sales Research:</strong> Researched AI tools for
                    business optimization and sales growth.
                  </li>
                  <li>
                    <strong>ARM Assembly:</strong> Explored low-level computing using
                    ARM Assembly and ASM IDE.
                  </li>
                </ul>
    
                <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-2">
                  Leadership & Vision
                </h2>
                <p className="text-gray-300">
                  As a student leader, I promote AI and modern tech in education.
                  My goal is to become a top-tier software developer and tech
                  entrepreneur, focusing on AI, cloud computing, and full-stack
                  development. Contact me for collaborations 🚀.
                </p>
    
                {/* Resume Download */}
                <Resume />
              </motion.div>
            )}
    
            {/* Read More / Show Less Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-6"
            >
              <Button
                onClick={() => setExpanded(!expanded)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                {expanded ? "Show Less" : "Read More"}
              </Button>
            </motion.div>
          </motion.div>
        </section>
      );
    };
    
    export default About;
