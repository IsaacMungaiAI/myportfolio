import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import scit from '/SCIT 2.jpg';
import image1 from '/chatsasa1.png';
import image2 from "/chatsasa2.png";
import image3 from "/chatsasa3.png";
import image4 from "/chatsasa4.png";
import image5 from "/weatherApp.png";
import image6 from "/weatherApp2.png";



const images = [image1, image2, image3, image3, image4, image5, image6];
const words = ["Hello, I am a Full Stack Developer", "I build modern web applications", "Let's create something amazing!", "I also build crossplatform mobile applications"];

interface WelcomeProps {
    theme: "light" | "dark";
}

const Welcome = ({ theme }: WelcomeProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [])


    useEffect(() => {
        const currentWord = words[wordIndex];
        let typingSpeed = isDeleting ? 50 : 100; // Speed up when deleting

        const updateText = () => {
            setDisplayText((prev) => {
                if (!isDeleting) {
                    // Typing phase
                    return currentWord.slice(0, prev.length + 1);
                } else {
                    // Deleting phase
                    return prev.slice(0, -1);
                }
            });
        };

        if (!isDeleting && displayText === currentWord) {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 1500);
            return;
        }

        if (isDeleting && displayText === "") {
            // Move to next word
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        const timer = setTimeout(updateText, typingSpeed);
        return () => clearTimeout(timer); // Cleanup

    }, [displayText, isDeleting, wordIndex]);



    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <motion.div
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* 🚀 Animated Avatar */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 120 }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                >
                    <Avatar className="w-45 h-45 border-4 border-violet-500 shadow-lg">
                        <AvatarImage src={scit} className="rounded-full" />
                        <AvatarFallback>IM</AvatarFallback>
                    </Avatar>

                    {/* ✨ Pulsating Ring Effect */}
                    <motion.div
                        className="absolute inset-0 w-full h-full rounded-full border-2 border-violet-500 opacity-60"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </motion.div>
                <motion.p
                    className="mt-2 text-lg font-bold text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    ISAAC MUNGAI MBUGUA
                </motion.p>
                {/* Typing Animation */}
                <motion.p
                    className="mt-2 text-xl font-semibold text-violet-600 dark:text-violet-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {displayText}|
                </motion.p>

            </motion.div>

            {/* Carousel Component */}
            <motion.div
                className="w-full max-w-2xl mt-6 rounded-lg w-full border-violet-600"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <Carousel className="w-full h-full rounded-lg">
                    <CarouselContent className="relative flex transition-transform duration ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {images.map((img, index) => (
                            <CarouselItem key={index} className="w-full flex justify-center items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md">
                                <motion.img src={img} alt={`Slide ${index + 1}`} className="w-full h-60 object-cover rounded-lg"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: currentIndex === index ? 1.1 : 0.9 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }} />
                            </CarouselItem>
                        ))}

                    </CarouselContent>
                    <CarouselPrevious
                        className={`absolute  top-1/2 transform -translate-y-1/2 bg-violet-600 text-white p-2 rounded-full shadow-lg hover:bg-violet-700 ${theme === "light" ? "bg-white text-black" : "bg-gray-600 text-white"}`}
                        onClick={() => {
                            setCurrentIndex((prevIndex) => {
                                const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
                                console.log("Previous Clicked, New Index:", newIndex);
                                return newIndex;
                            });
                        }}
                    />
                    <CarouselNext onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)} />
                </Carousel>
            </motion.div>
        </div>
    );
};
export default Welcome;