import { Button } from "./components/ui/button";
import { useEffect,useState } from "react";
import { Switch } from "./components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Link } from "react-scroll";

interface NavbarProps {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
}
const Navbar = ({ theme, setTheme }: NavbarProps) => {
    const [activeSection, setActiveSection] = useState("home");


    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme as "light" | "dark");
        document.body.classList.toggle("dark", savedTheme === "dark");
    }, [setTheme]);

// Observer to track active section
useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);




    return (
        <nav className={`fixed position-fixed top-0 left-0 w-full ${theme === "light" ? "bg-gray-400" : "bg-gray-600"} shadow-lg z-50`}>
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-bold ">Mungai</div>
                {/* Desktop Navigation */}
                <div className={`hidden font-sans md:flex gap-6 `}>
                {["home", "about", "projects", "contact", "location"].map((section) => (
                        <Link
                            key={section}
                            to={section}
                            smooth={true}
                            duration={500}
                            className={`navbar-link text-1xl transition-all ${
                                activeSection === section ? "text-violet-400 font-bold scale-150 underline decoration-2 underline-offset-4" : "text-gray-300 scale"
                            }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center">
                    {/* Mobile Navigation - Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={`md:hidden fixed border-none right-1 bg-transparent ${theme === "light" ? "bg-white" : "bg-gray-300"} shadow-lg z-50`}
                            style={{ border: "none", boxShadow: "none", background: "transparent" }}
                            >
                                ☰
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className={`w-40 ${theme === "light" ? "bg-gray-400" : "bg-gray-600"} shadow-lg z-50 text-white`}>
                        {["home", "about", "projects", "contact", "location"].map((section) => (
                                <DropdownMenuItem key={section}>
                                    <Link
                                        to={section}
                                        smooth={true}
                                        duration={500}
                                        className={`navbar-link text-1xl transition-all ${
                                            activeSection === section ? "text-violet-400 font-bold" : "text-gray-300"
                                        }`}
                                    >
                                        {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-3">
                    Theme
                    <Switch className={`${theme === "light" ? "bg-gray-400" : "bg-gray-600"}`} 
                    
                    onClick={toggleTheme} />
                    {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </div>
            </div>
        </nav>
    );

};
export default Navbar;