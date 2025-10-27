import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const AnimatedSection = ({ children, id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.section
      animate={isInView ? "visible" : "hidden"}
      className="relative z-10"
      id={id}
      initial="hidden"
      ref={ref}
      variants={containerVariants}>
      {children}
    </motion.section>
  );
};
