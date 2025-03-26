import {  useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import ParticlesBackground from "./ParticlesBackground";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from './Contact';
import Location from "./Location"
import { Instagram, Linkedin, Github, Phone } from "lucide-react";
import { Toaster } from 'sonner';
import Preloader from './Preloader';

//animations for rendering
//import { motion } from 'framer-motion';





function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);


  return (
    <>

{loading && <Preloader onLoadingComplete={() => setLoading(false)} />}
{!loading && <div className={theme === "light" ? "bg-gradient-to-br from-gray-100 to-gray-200 text-black" : "bg-gray-900 text-white"}>
       
       <ParticlesBackground />
       <Navbar theme={theme} setTheme={setTheme} />
       <main className="overflow-hidden bg-transparent relative">
       <Toaster richColors position="top-center" />
               <Home theme={theme} />
            
         <About theme={theme} />
         <Projects theme={theme} />
         <Contact theme={theme} />
         <Location theme={theme} />
       </main>
       <footer className="bg-gray-800 text-white py-6 mt-10">
         <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
           <p className="text-sm">&copy; {new Date().getFullYear()} Isaac Mungai. All rights reserved.</p>

           <div className="flex space-x-6">
             <a href="https://instagram.com/yc33.mungai_" target="_blank" rel="noopener noreferrer">
               <Instagram className="h-6 w-6 hover:text-pink-500 transition" />
             </a>
             <a href="https://wa.me/0103273776" target="_blank" rel="noopener noreferrer">
               <Phone className="h-6 w-6 hover:text-green-500 transition" />
             </a>
             <a href="https://linkedin.com/in/isaac-mbugua-423ba734a" target="_blank" rel="noopener noreferrer">
               <Linkedin className="h-6 w-6 hover:text-blue-500 transition" />
             </a>
             <a href="https://github.com/IsaacMungaiAI" target="_blank" rel="noopener noreferrer">
               <Github className="h-6 w-6 hover:text-gray-400 transition" />
             </a>
           </div>
         </div>
       </footer>
     </div>
}
      
    </>
  )
}
export default App
