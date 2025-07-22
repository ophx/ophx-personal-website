import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const COLORS_TOP = ["#9B30FF"];

export default function AnimatedColors({
  children,
}) {
  const ref = useRef(null);
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, transparent 50%, ${color})`;

  return (
    <div ref={ref}>
      <motion.div style={{ backgroundImage }} className="relative grid min-h-screen place-content-center overflow-hidden">
        <div className="z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}