import { motion } from "framer-motion";
import { useRef } from "react";

export default function Animated({
  initial,
  whileInView,
  transition,
  children,
}) {
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <motion.div
        initial={initial}
        whileInView={whileInView}
        transition={transition}
        viewport={{ once: true, amount: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}