import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const COLORS_TOP = ["#9B30FF", "#D500F9", "#FF0099", "#DA70D6", "#FF66B2", "#8A2BE2", "#FF1493"];

export default function AnimatedColors({
  children,
}) {
  const [init, setInit] = useState(false);
  const ref = useRef(null);
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, transparent 50%, ${color})`;

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div ref={ref}>
      <motion.div style={{ backgroundImage }} className="relative grid min-h-screen place-content-center overflow-hidden">
        <div className="absolute inset-0">
          <Particles id="tsparticles" options={options} />
        </div>
        
        <div className="z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}