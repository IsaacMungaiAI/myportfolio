import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

const SectionBg = ({ effect }: { effect: "stars" | "snow" | "moon" }) => {
    const particlesInit = useCallback(async (engine: any) => {
        await loadSlim(engine);
    }, []);

    const particlesOptions =
        effect === "stars"
            ? {
                  particles: {
                      number: { value: 80 },
                      move: { speed: 0.3 },
                      size: { value: 2 },
                      shape: { type: "star" },
                      opacity: { value: 0.7 },
                  },
                  background: { color: "transparent" },
              }
            : effect === "snow"
            ? {
                  particles: {
                      number: { value: 100 },
                      shape: { type: "circle" },
                      opacity: { value: 0.5 },
                      move: { speed: 0.2 },
                      size: { value: 3 },
                      color: { value: "#ffffff" },
                  },
                  background: { color: "transparent" },
              }
            : {
                  particles: {
                      number: { value: 5 },
                      shape: { type: "circle" },
                      opacity: { value: 1 },
                      size: { value: 10 },
                      color: { value: "#f4c542" },
                      move: { speed: 0.1 },
                  },
                  background: { color: "transparent" },
              };
              //console.log("Effect received:", effect);
    return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />;
};

export default SectionBg;
