import { motion } from "framer-motion";
import { useRef } from "react";

export default function AnimatedScroll({ children }) {
    const ref = useRef(null);

    return (
        <div ref={ref}>
            <motion.div
                transition={{ duration: 0.5, delay: 0.25 }}
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.5 }}
            >
                {children}
            </motion.div>
        </div>
    );
}