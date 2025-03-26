import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const About = () => {
    const [aboutContent, setAboutContent] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/about")
            .then((response) => {
                setAboutContent(response.data.content);
            })
            .catch((error) => {
                console.error("Error fetching about content:", error);
            });
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto text-gray-800 text-lg leading-relaxed">
            {aboutContent ? <ReactMarkdown>{aboutContent}</ReactMarkdown> : <p>Loading...</p>}
        </div>
    );
};

export default About;
