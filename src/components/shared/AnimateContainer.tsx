import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const AnimateContainer = ({ children }: { children: React.ReactNode }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimateContainer;
