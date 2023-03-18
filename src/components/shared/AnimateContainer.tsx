import { Grid, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "src/store";
import { adminActions } from "src/utils/adminActions";

interface AnimateContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  ActionButton?: React.ReactNode;
}

const AnimateContainer = ({
  children,
  title,
  subtitle,
  ActionButton,
}: AnimateContainerProps) => {
  const { adminData } = useStore();
  const location = useLocation();
  const container = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const item = {
    hidden: { opacity: 0, x: -20, transition: { type: "tween" } },
    show: { opacity: 1, x: 0, transition: { type: "tween" } },
    exit: { opacity: 0, x: 20, transition: { type: "tween" } },
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
        <motion.div variants={item}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            {title}
          </Typography>
        </motion.div>
        <motion.div variants={item}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Grid item>
              <Typography variant="h6" fontWeight="bold">
                {subtitle}
              </Typography>
            </Grid>
            <Grid item>
              {adminActions(adminData, "Create") !== false
                ? ActionButton
                : null}
            </Grid>
          </Grid>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimateContainer;
