import { motion } from "framer-motion";
import SectionBg from "./SectionBg";
import Welcome from './Welcome';
import FloatingOrbs from "./CyberWave";
import Fireworks from "./Fireworks";


interface HomeProps {
    theme: "light" | "dark";
}

const Home = ({theme}:HomeProps) => {
    return (
        <section id="home" className={`relative min-h-screen flex items-center justify-center bg-transparent text-white ${
            theme === "light" ? "bg-violet-400 text-black" : "bg-black text-white"
        } `}>
            <Fireworks/>
            <SectionBg effect="stars" />
            <FloatingOrbs/>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <Welcome theme={theme}/>
                
            </motion.div>
        </section>
    );
};

export default Home;
