import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";

const AnimateContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const container = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        type: "tween",
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        staggerChildren: 0.1,
        type: "tween",
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
        key={location.pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimateContainer;
