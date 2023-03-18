import { motion } from "framer-motion";

interface IProps {
  size?: number | string | undefined;
}

const EllipsisAnim = ({ size }: IProps) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
        staggerDirection: 1,
        type: "tween",
      },
    },
  };

  const ellipsisVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeOut",
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
          <motion.span
            key={idx}
            variants={ellipsisVariants}
            style={{
              width: size ?? "0.3rem",
              height: size ?? "0.3rem",
              display: "inline-block",
              borderRadius: "50%",
              backgroundColor: "currentColor",
              margin: "0 0.15rem",
            }}
          >
            {item}
          </motion.span>
        ))}
    </motion.span>
  );
};

export default EllipsisAnim;
