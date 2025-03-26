import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionBg from "./SectionBg";
import { Button } from "@/components/ui/button"; // Importing ShadCN button
import FloatingOrbs from "./CyberWave";
import { Skeleton } from "./components/ui/skeleton";


interface ProjectsProps {
    theme: "light" | "dark";
}

interface Project {
    id: number;
    title: string;
    description: string;
    link: string;
}

const Projects = ({ theme }: ProjectsProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const bUrl=import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${bUrl}/projects`) // API endpoint
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error("Unexpected API response:", data);
                    setError("Failed to load projects.");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching projects:", err);
                setError("Could not fetch projects.");
                setLoading(false);
            });
    }, []);


    return (
        <section
            id="projects"
            className={`relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-transparent ${
                theme === "light" ? "bg-violet-400 text-black" : "bg-black text-white"
            }`}
        >
            <FloatingOrbs/>
            <SectionBg effect="snow" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={`text-center`}
            >
                <h1 className="text-4xl font-bold">My Projects</h1>
                <p className="mt-3 text-lg">Check out my latest work</p>
            </motion.div>

            {/* Loading & Error Handling */}
            {loading ? (
                <div className="mt-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((index) => (
                    <Skeleton key={index} className="h-40 w-full rounded-lg bg-gray-600/50 animate-pulse" />
                ))}
            </div>
                
            ) : error ? (
                <p className="mt-6 text-red-500">{error}</p>
            ) : (
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-4xl  bg-transparent`}>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                            className={`bg dark:bg-transparent p-6 rounded-lg shadow-lg backdrop-blur-md border 
                                ${theme==='dark' ? "bg-violet text-black" : "bg-black text-white"} border-white/10 flex flex-col justify-between`}
                        >
                            <h2 className="text-2xl font-semibold">{project.title}</h2>
                            <p className="mt-2 text-gray-300">{project.description}</p>

                            {/* ShadCN Button */}
                            <Button
                                variant="default"
                                className="mt-4 bg-violet-600 text-white hover:bg-violet-700 transition"
                                onClick={() => window.open(project.link, "_blank")}
                            >
                                View Project
                            </Button>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;
