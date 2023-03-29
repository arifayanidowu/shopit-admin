import { Box } from "@mui/material";
import { motion } from "framer-motion";

interface IProps {
  size?: number | string | undefined;
}

const EllipsisContainer = motion(Box);

const EllipsisAnim = ({ size }: IProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0.5,
      y: -5,
    },
    visible: {
      opacity: 0.8,
      y: [0, -5, 0],
      transition: {
        staggerChildren: 0.4,
        staggerDirection: 1,
        duration: 2,
        type: "tween",
      },
    },
  };

  const ellipsisVariants = {
    hidden: {
      opacity: 0.5,
      y: -5,
    },
    visible: {
      opacity: 0.8,
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        type: "tween",
        ease: "easeInOut",
        damping: 10,
        stiffness: 600,
      },
    },
  };
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array(3)
        .fill("")
        .map((item, idx) => (
          <EllipsisContainer
            key={idx}
            variants={ellipsisVariants}
            sx={{
              width: size ?? "0.2rem",
              height: size ?? "0.2rem",
              display: "inline-block",
              borderRadius: 100,
              backgroundColor: "currentColor",
              margin: "0 1px",
              border: "1px solid error.main",
            }}
            component="span"
          >
            {item}
          </EllipsisContainer>
        ))}
    </motion.span>
  );
};

export default EllipsisAnim;
