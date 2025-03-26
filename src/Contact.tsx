import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import SectionBg from "./SectionBg";
import FloatingOrbs from "./CyberWave";

interface ContactProps{
    theme: "light" | "dark";
}

const Contact = ({theme}: ContactProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await emailjs.send(
                import.meta.env.VITE_SERVICE_ID, // Replace with your EmailJS service ID
                import.meta.env.VITE_TEMPLATE_ID, // Replace with your EmailJS template ID
                formData,
                import.meta.env.VITE_PUBLIC_KEY // Replace with your EmailJS public key
            );

            if (response.status === 200) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            //console.error("Email sending error:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className={`relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-transparent text-white ${
            theme === "light" ? "bg-violet-400 text-black" : "bg-black text-white"
        }`}>
            <FloatingOrbs/>
            <SectionBg effect="moon" />
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center bg-gray-900 p-6 rounded-lg shadow-lg w-96"
            >
                <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
                <form onSubmit={handleSubmit} className={`flex flex-col gap-4 shadow-lg ${theme==="light" ? "shadow-lg" : ""} `}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-3 rounded bg-gray-800 text-white focus:outline-none"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 rounded bg-gray-800 text-white focus:outline-none"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        className="p-3 rounded bg-gray-800 text-white focus:outline-none"
                        rows={4}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Sending..." : "Send Message"}
                    </button>
                </form>
                {status === "success" && <p className="mt-3 text-green-400">Message sent successfully!</p>}
                {status === "error" && <p className="mt-3 text-red-400">Failed to send message. Try again.</p>}
            </motion.div>
        </section>
    );
};

export default Contact;

